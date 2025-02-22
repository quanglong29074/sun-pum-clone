import {Image, Progress} from "antd";
import React from "react";
import {Token} from "../../../types.ts";
import {useReadContract} from "wagmi";
import PUMP_ABI from '../../../contracts/abis/pump.json';
import {formatEther} from "viem";

const TokenInfo: React.FC<{ token: Token }> = ({token}) => {
  const {data: poolState ={}}: any = useReadContract({
    abi: PUMP_ABI,
    address: import.meta.env.VITE_PUMP_FUN_ADDRESS as `0x${string}`,
    functionName: 'getPoolState',
    args: [token?.tokenAddress],
  })
  const {supply = 0n} = poolState
  const tokenSaled = +formatEther(supply as bigint);
  const progress = tokenSaled / 1_000_000_000 * 100;
  return (
    <>
      <div className='flex gap-4 w-full my-3'>
        <div className='max-w-1/3 w-full flex-none'>
          <Image
            src={token?.mediaUrl ?? '/token-demo.jpg'}
            style={{width: '100%'}}
            preview={false}
          />
        </div>
        <div className='text-left'>
          <p className='font-bold text-sm text-white'>{token?.name} [{token?.symbol}]</p>
          <p className='text-gray-400'>
            {token?.description}
          </p>
        </div>
      </div>
      <div>
        <div className='text-gray-400 mb-2'>
          bonding curve progress: {progress.toFixed(2)}%
        </div>
        <Progress
          percent={progress}
          showInfo={false}
          // size={25}
          size={{
            height: 16
          }}
          strokeColor="#5CC4C9"
          trailColor='#1B1D28'

        />
      </div>
    </>


  )
}
export default TokenInfo;