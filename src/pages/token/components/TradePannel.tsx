import React, {useState} from 'react';
import {Token} from "../../../types.ts";
import {useAccount, useBalance, useReadContract} from "wagmi";
import PUMP_ABI from "../../../contracts/abis/pump.json";
import ERC20_ABI from "../../../contracts/abis/erc20.json";
import {formatEther} from "viem";
import toast from "react-hot-toast";
import {contractPort} from "../../../contracts";

const TradePanel: React.FC<{ token: Token; }> = ({token}) => {
  const [activeTab, setActiveTab] = useState('buy');
  const [amountString, setAmountString] = useState('0.00');
  const [loading, setLoading] = useState(false);
  const account = useAccount();
  const {data: balance} = useBalance({
    address: account?.address,
  });

  const {data: tokenPriceBigInt = 0n} = useReadContract({
    abi: PUMP_ABI,
    address: import.meta.env.VITE_PUMP_FUN_ADDRESS as `0x${string}`,
    functionName: 'price',
    args: [token?.tokenAddress],
  })
  const {data: tokenBalanceBn = 0n} = useReadContract({
    abi: ERC20_ABI,
    address: token?.tokenAddress as `0x${string}`,
    functionName: 'balanceOf',
    args: [account?.address],
  })
  const tokenBalance = +formatEther(tokenBalanceBn as bigint);

  const tokenPrice = +formatEther(tokenPriceBigInt as bigint);
  const amount = +amountString || 0;

  const handleTrade = async () => {
    try {
      setLoading(true);
      if (!token.tokenAddress) {
        return
      }
      if (amount <= 0) {
        throw new Error('Invalid amount');
      }
      let hash = ''
      if (activeTab === 'buy') {
        hash = await contractPort.pumpFun.buyTokenSale(token.tokenAddress, amount);
      } else {
        hash = await contractPort.pumpFun.sellToken(token.tokenAddress, amount);
      }
      console.log(hash)
      setAmountString("0.00");
      toast.success('Transaction completed');
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="w-full bg-[#1E2129] p-6 rounded-xl">
      {/* Buy/Sell Tabs */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <button
          onClick={() => setActiveTab('buy')}
          className={`py-2 px-4 rounded-lg text-lg font-medium transition-colors cursor-pointer
            ${activeTab === 'buy'
            ? 'bg-green-400 text-black'
            : 'bg-[#1a1f2e] text-green-400 opacity-50'
          }`}
        >
          buy
        </button>
        <button
          onClick={() => setActiveTab('sell')}
          className={`py-2 px-4 rounded-lg text-lg font-medium transition-colors cursor-pointer
            ${activeTab === 'sell'
            ? 'bg-[#ef5350] text-white'
            : 'bg-[#1a1f2e] text-[#ef5350] opacity-50'
          }`}
        >
          sell
        </button>
      </div>


      {/* Amount Input */}
      <div className="mb-4">
        <label className="text-gray-300 text-sm mb-2 block">
          balance: {activeTab === 'sell' ? tokenBalance.toLocaleString() : +(balance?.formatted ?? '0').toLocaleString()} {activeTab === 'sell' ? token?.symbol : 'PHO'}
        </label>
        <div className="relative">
          <input
            type="text"
            value={amountString}
            onChange={(e) => setAmountString(e.target.value)}
            className="pr-24 w-full bg-transparent border border-gray-700 rounded-lg py-2 px-3 text-gray-300 text-lg focus:outline-none focus:border-gray-600"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <span className="text-gray-300">{activeTab === 'sell' ? token?.symbol : 'PHO'}</span>
            <img
              src={activeTab === 'sell' ? token?.mediaUrl || '/token-demo.jpg' : '/favicon-32x32.png'}
              alt="Token"
              className="w-6 h-6 rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Quick Amount Buttons */}
      <div className="text-gray-400 text-sm mb-6">
        {
          activeTab === 'buy' ? `${amount / tokenPrice} ${token?.symbol}` : `${amount * tokenPrice} PHO`
        }
      </div>

      {/* Place Trade Button */}
      <button
        disabled={loading}
        onClick={handleTrade}
        className={`w-full py-3 rounded-lg text-lg font-medium transition-colors cursor-pointer
          ${activeTab === 'buy'
          ? 'bg-green-400 text-black hover:bg-[#22a070]'
          : 'bg-[#ef5350] text-white hover:bg-[#e74c49]'
        }`}
      >
        {loading ? 'Executing...' : activeTab}
      </button>
    </div>
  );
};

export default TradePanel;