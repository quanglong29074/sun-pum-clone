import React, {useEffect, useMemo, useState} from 'react';
import {Token} from "../../../types.ts";
import {useQuery} from "@tanstack/react-query";
import pumpfunApi from "../../../apis/pumpfun-api.ts";
import {minimizeAddress} from "../../../utils.ts";
import {formatEther} from "viem";
import moment from "moment";
import {Pagination} from "antd";
import {useNavigate} from "react-router-dom";

const TradingHistory: React.FC<{
  token: Token;
}> = ({token}) => {
  const [searchParams, setSearchParams] = useState({
    page: 0,
    limit: 30,
    tokenAddress: ''
  })
  const navigate = useNavigate();
  useEffect(() => {
    if(!token.tokenAddress) return
    setSearchParams({
      ...searchParams,
      tokenAddress: token.tokenAddress
    })
  }, [token]);
  const {
    data: tradingHistoryData,
  } = useQuery({
    queryKey: ['pumpfunApi.tradingHistories', searchParams],
    enabled: !!token?.tokenAddress,
    queryFn: async ({queryKey}) => await pumpfunApi.fundingHistories.list(queryKey[1] ?? {})
  })
  const tradingHistories = tradingHistoryData?.contents ?? [];
  const tableData = useMemo(() => {
    return tradingHistories.map((tx) => ({
      from: minimizeAddress(tx.from),
      fromFull: tx.from,
      type: tx.type === 1 ? 'buy' : 'sell',
      wethAmount: Number(formatEther(BigInt(tx.amountWeth))).toLocaleString(),
      tokenAmount: Number(formatEther(BigInt(tx.amountToken))).toLocaleString(),
      time: moment(tx.timestamp * 1000).fromNow(),
      txHash: minimizeAddress(tx.txHash),
      color: tx.type === 1 ? 'bg-green-400' : 'bg-red-400',
      key: tx.id,
      hash: tx.txHash
    }))
  }, [tradingHistories])
  return (
    <div className="bg-gray-900 text-gray-100 p-4 w-full">
      <div className="w-full overflow-x-auto">
        <table className="w-full">
          {/* Table Header */}
          <thead>
          <tr className="text-gray-400 text-sm border-b border-gray-800">
            <th className="text-left py-3 px-4">account</th>
            <th className="text-left py-3 px-4">type</th>
            <th className="text-left py-3 px-4">PHO</th>
            <th className="text-left py-3 px-4">{token?.symbol}</th>
            <th className="text-left py-3 px-4">
              <div className="flex items-center gap-1">
                date
              </div>
            </th>
            <th className="text-right py-3 px-4">transaction</th>
          </tr>
          </thead>

          {/* Table Body */}
          <tbody>
          {tableData.map((tx) => (
            <tr
              key={tx.key}
              className="border-b border-gray-800 text-sm hover:bg-gray-800/50 transition-colors"
            >
              <td className="py-4 px-4">
                <div className="flex items-center gap-2">
                  <p onClick={() => navigate(`/profile/${tx.fromFull}`)} className={`${tx.color} px-2 py-1 rounded text-xs cursor-pointer`}>
                    {tx.from}
                  </p>
                </div>
              </td>
              <td className="py-4 px-4">
                  <span className={`${tx.type === 'buy' ? 'text-green-400' : 'text-red-400'}`}>
                    {tx.type}
                  </span>
              </td>
              <td className="py-4 px-4">{tx.wethAmount}</td>
              <td className="py-4 px-4">{tx.tokenAmount}</td>
              <td className="py-4 px-4 text-gray-500">{tx.time}</td>
              <td className="py-4 px-4 text-right text-gray-500">
                <div className='underline cursor-pointer' onClick={() => {
                  window.open(`https://testnet.phoscan.org/tx/${tx.hash}`, '_blank')
                }}>
                  {tx.txHash}
                </div>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center my-6">
        <Pagination
          current={(searchParams?.page ?? 0) + 1}
          pageSize={searchParams?.limit ?? 10}
          total={tradingHistoryData?.total ?? 0}
          onChange={(page) => setSearchParams((prev) => ({
            ...prev,
            page: page - 1,
          }))}
          showSizeChanger={false}
          className="custom-pagination text-emerald-300"
          showLessItems
          showTitle={false}
        />
      </div>
    </div>
  );
};

export default TradingHistory;