import React, {useMemo} from "react";
import {Link, useParams} from "react-router-dom";
import {Col, Row, Skeleton} from "antd";
import {PriceChart} from "../../components";
import TradePanel from "./components/TradePannel.tsx";
import useWindowSize from "../../hooks/useWindowSize.ts";
import TokenInfo from "./components/TokenInfo.tsx";
import TokenHolder from "./components/TokenHolder.tsx";
import ListComments from "./components/ListComments.tsx";
import TradingHistory from "./components/TradingHistory.tsx";
import {useQuery} from "@tanstack/react-query";
import pumpfunApi from "../../apis/pumpfun-api.ts";
import {minimizeAddress} from "../../utils.ts";
import moment from "moment";
import {Token} from "../../types.ts";
import {formatEther} from "viem";

const TokenPage: React.FC = () => {
  const {address} = useParams();
  const {data: token = {} as Token, isLoading: isLoadingToken} = useQuery({
    queryKey: ['pumpfunApi.token.one', address],
    enabled: !!address,
    queryFn: async ({queryKey}) => await pumpfunApi.token.one(queryKey[1] ?? "")
  })
  const {width} = useWindowSize();
  const listTabs = ['comments', 'trading-history', 'info', 'trade-panel'];
  const [activeTab, setActiveTab] = React.useState(listTabs[0]);

  const {data: candleData = []} = useQuery({
    queryKey: ['pumpfunApi.fundingHistories.candleData', {tokenAddress: address, interval: 30}],
    enabled: !!address,
    queryFn: async ({queryKey}) => await pumpfunApi.fundingHistories.candleData(queryKey[1] ?? {})
  })
  const chartData = useMemo(() => candleData.map(item => {
    return {
      open: +formatEther(BigInt(item.open)),
      high: +formatEther(BigInt(item.high)),
      low: +formatEther(BigInt(item.low)),
      close: +formatEther(BigInt(item.close)),
      time: item.time
    }

  }), [candleData])

  return (
    isLoadingToken ? <Skeleton active/> : (
      <div className='p-10'>
        <div className='text-white mb-4'>
          {/*<Link to='/'>[go back]</Link>*/}
        </div>
        <Row gutter={24}>
          <Col xl={16} lg={16} md={12} xs={24} sm={24} className='mb-4'>
            <div className='flex w-full gap-2 items-center'>
              <div className='text-white'>{token?.name} ({token?.symbol})</div>
              <div
                onClick={() => {
                  window.open(`https://testnet.phoscan.org/address/${token?.tokenAddress}`, '_blank')
                }}
                className="cursor-pointer px-1 rounded hover:underline flex gap-1 text-black" style={{
                backgroundColor: "rgb(132, 129, 166)"
              }}>
                {minimizeAddress(token?.tokenAddress ?? "")}
              </div>
              <div className='text-[#9DC4F8]'>{moment(token?.createdAt).fromNow()}</div>
              <div className='text-green-300'>market cap:
                ${((token?.totalSupply ?? 0) * (chartData?.[chartData.length - 1]?.close ?? 0) * 0.02).toLocaleString()}</div>
              <div className='text-[#9DA3AE]'>replies: {token?.repliesCount ?? 0}</div>
            </div>
            <PriceChart data={chartData} token={token}/>
            {
              width > 768 && (
                <>
                  <button
                    className={activeTab === 'comments' ? 'text-lg cursor-pointer px-1 rounded text-black bg-[#5CC4C9]' : 'text-lg cursor-pointer px-1 rounded hover:bg-gray-800 text-gray-500 mx-3'}
                    onClick={() => setActiveTab('comments')}
                  >
                    thread
                  </button>
                  <button
                    className={activeTab === 'trading-history' ? 'text-lg cursor-pointer px-1 rounded text-black bg-[#5CC4C9]' : 'text-lg cursor-pointer px-1 rounded hover:bg-gray-800 text-gray-500 mx-3'}
                    onClick={() => setActiveTab('trading-history')}
                  >
                    trades
                  </button>
                  {
                    activeTab === 'comments' && (
                      <div className='mt-4'>
                        <ListComments/>
                      </div>
                    )
                  }
                  {
                    activeTab === 'trading-history' && (
                      <div className='mt-4'>
                        <TradingHistory token={token}/>
                      </div>
                    )
                  }
                  {
                    activeTab === 'info' && (
                      <div className='mt-4'>
                        <TokenInfo token={token}/>
                      </div>
                    )
                  }
                  {
                    activeTab === 'trade-panel' && (
                      <div className='mt-4'>
                        <TradePanel token={token}/>
                      </div>
                    )
                  }
                </>
              )
            }
          </Col>
          <Col xl={8} lg={8} md={12} xs={24} sm={24}>
            {
              width > 768 && (
                <>
                  <TradePanel token={token}/>
                  <TokenInfo token={token}/>
                  <TokenHolder/>
                </>
              )
            }
          </Col>
        </Row>
        {
          width <= 768 && (
            <>
              <div className='flex w-full'>
                <button
                  className={activeTab === 'info' ?
                    'w-1/3 text-lg cursor-pointer px-1 text-black bg-green-300' :
                    'w-1/3 text-lg cursor-pointer px-1 hover:bg-gray-800 text-gray-500 '}
                  onClick={() => setActiveTab('info')}
                >
                  info
                </button>
                <button
                  className={activeTab === 'comments' ?
                    'w-1/3 text-lg cursor-pointer px-1 text-black bg-green-300' :
                    'w-1/3 text-lg cursor-pointer px-1 hover:bg-gray-800 text-gray-500 '}
                  onClick={() => setActiveTab('comments')}
                >
                  thread
                </button>
                <button
                  className={activeTab === 'trade-panel' ?
                    'w-1/3 text-lg cursor-pointer px-1 text-black bg-green-300' :
                    'w-1/3 text-lg cursor-pointer px-1 hover:bg-gray-800 text-gray-500 '}
                  onClick={() => setActiveTab('trade-panel')}
                >
                  trades
                </button>
              </div>
              {
                activeTab === 'info' && (
                  <div className='mt-4'>
                    <TokenInfo token={token}/>
                    <TokenHolder/>
                  </div>
                )
              }
              {
                activeTab === 'comments' && (
                  <div className='mt-4'>
                    <ListComments/>
                  </div>
                )
              }
              {
                activeTab === 'trade-panel' && (
                  <div className='mt-4'>
                    <TradePanel token={token}/>
                    <TradingHistory token={token}/>
                  </div>
                )
              }
            </>
          )
        }
      </div>
    )
  )
}
export default TokenPage;