import React from "react";
import {Image} from "antd";
import {useNavigate} from "react-router-dom";
import {Token} from "../types.ts";
import {useReadContract} from "wagmi";
import PUMP_ABI from '../contracts/abis/pump.json'
import {formatEther} from "viem";

interface TokenProps {
  className?: string;
  showDetail?: boolean;
  token: Token;
  isShaking?: boolean;
}

const TokenItem: React.FC<TokenProps> = ({className = "", showDetail = true, token, isShaking = false}) => {
  const navigate = useNavigate();
  const {data: tokenPriceBigInt = 0n} = useReadContract({
    abi: PUMP_ABI,
    address: import.meta.env.VITE_PUMP_FUN_ADDRESS as `0x${string}`,
    functionName: 'price',
    args: [token?.tokenAddress],
  })
  const phoPrice = 0.02;
  const tokenPrice = +formatEther(tokenPriceBigInt as bigint);
  return (
    <div className={`text-white ${className} overflow-hidden ${isShaking ? 'animate-[shake_0.2s_ease-in-out_infinite] bg-yellow-600' : ''}`}>
      <div className='flex gap-4 cursor-pointer w-full border border-[#FF6347] p-1 bg-[#1a1d2e] rounded-lg'>
        <div
          className='max-w-1/3 w-full flex-none'
          onClick={() => navigate(`/token/${token?.tokenAddress}`)}
        >
          <Image
            src={token?.mediaUrl || '/token-demo.jpg'} // Nếu không có ảnh, dùng ảnh mặc định
            style={{width: '100%'}}
            preview={false}
          />
        </div>
        <div className='text-left'>
          <p className="text-xs text-blue-200 cursor-pointer">
            Created by
            <span> </span>
            <span
              className="hover:underline"
              onClick={(event) => {
                event.preventDefault(); // Ngăn điều hướng mặc định
                event.stopPropagation(); // Ngăn chặn sự kiện click lan lên <Link>
                navigate(`/profile/${token?.creatorAddress}`);
              }}
            >
              {token?.creatorAddress.substring(0, 6)}...{token?.creatorAddress.slice(-4) || "abcd"}
            </span>
          </p>
          <p className='font-bold text-sm'
             onClick={() => navigate(`/token/${token?.tokenAddress}`)}
          >{token?.name || "MyToken"} [{token?.symbol || "MTK"}]
            {showDetail && (
              <span
                className='break-words text-gray-400 font-medium'>: {token?.description}</span>
            )}
          </p>
          <p className='text-xs text-[#5CC4C9]'>Market cap: ${(token?.totalSupply * tokenPrice * phoPrice).toLocaleString()}</p>
          <p className='text-xs text-[#5CC4C9]'>
            <Image />
          </p>
        </div>
      </div>
    </div>
  );
};

export default TokenItem;
