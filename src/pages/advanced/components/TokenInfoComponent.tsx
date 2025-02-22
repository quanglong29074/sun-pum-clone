import {Table} from 'antd';
import PriceChartForAdvanced from "./PriceChartForAdvanced.tsx";
import HolderTable from "./Holder.tsx";
import TradeList from "./TradeList.tsx";
import {CiUser} from "react-icons/ci";
import ThreadsComponent from "../components/ThreadComponent.tsx";
import QuickBuy from "./QuickBuy.tsx";
import {AiOutlineAim} from "react-icons/ai";
import {useQueries} from "@tanstack/react-query";
import pumpfunApi from "../../../apis/pumpfun-api.ts";
import { IoMdTime } from "react-icons/io";
import { formatDistanceToNow } from 'date-fns';
import {useNavigate} from "react-router-dom";




const TokenInfoComponent = ({listTokens,amountQuickbuy}: { listTokens: any,amountQuickbuy:any}) => {
    const navigate = useNavigate();
    const formatTimeAgo = (dateString: string) => {
        return formatDistanceToNow(new Date(dateString), { addSuffix: true }).replace('about ', '');;
    };
    const formatVolume = (volume: any) => {
        if(!volume){
            return 0;
        }
        return new Intl.NumberFormat('en-US', {
            notation: "compact",
            maximumFractionDigits: 2
        }).format(volume);
    };
    const chartQueries = useQueries({
        queries: (listTokens || []).map((token: any) => ({
            queryKey: ['pumpfunApi.token.chartData', {tokenAddress: token.tokenAddress, interval: 300}],
            queryFn: async ({queryKey}: {
                queryKey: any
            }) => {
                const data = await pumpfunApi.fundingHistories.candleData(queryKey[1] ?? {});
                return { data, tokenAddress: queryKey[1].tokenAddress };
            },
        }))
    });
    const columns = [
        {
            title: 'COIN',
            dataIndex: 'name',
            render: (text: any, record: any, _index: number) => (
                <div onClick={() => navigate(`/token/${record?.tokenAddress}`)} className=" cursor-pointer flex items-center gap-2" >
                    <div  className="flex-shrink-0 w-[88px] h-[88px] overflow-hidden rounded-lg">
                        <img src={record.mediaUrl || 'token-demo.jpg'} alt={text} width={88} height={88}/>
                    </div>
                    <div className="flex flex-col justify-between gap-1">
                        <div className="text-lg font-semibold">{text}</div>
                        <div className="flex justify-between">
                            <div className="flex gap-3"><span
                                className="text-green-400">MC</span>{formatVolume(record.totalSupply)}</div>
                            <div className="flex items-center"><CiUser className="text-[#EC8F6D]"/>{500}</div>
                        </div>
                        <div className="flex justify-between gap-6">
                            <div className="flex justify-between gap-6">
                                <div className="flex gap-3">
                                    <span className="text-green-400">Vol</span>
                                    <span>
                                         $10k
                    </span>
                                </div>
                            </div>
                            <div className="flex items-center whitespace-nowrap"><IoMdTime className="text-[#EC8F6D]" />{formatTimeAgo(record.createdAt)}</div>
                        </div>
                        <div className="flex justify-between">
                            <div className="flex gap-3"><span className="text-green-400">T10</span>21%</div>
                            <div className="flex items-center"><span className="text-[#EC8F6D]">DH</span>-%<AiOutlineAim
                                className='text-[#EC8F6D]'/>4
                            </div>

                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: 'CHART',
            dataIndex: 'chart',
            render: (_: any, _record: any, index: number) => {
                const tokenData = chartQueries[index]?.data || [];
                return (
                    <PriceChartForAdvanced
                        chartData={tokenData}
                    />
                );
            },
        },
        {
            title: (
                <div className="flex ">
                    <div className="text-sm text-gray-400 w-[29%]">HOLDERS</div>
                    <div className="text-sm text-gray-400 w-[24%] text-left">Own</div>
                    <div className="text-sm text-gray-400 w-[12%] text-left">Sol</div>
                    <div className="text-sm text-gray-400 w-[17%] text-left">U.PnL</div>
                    <div className="text-sm text-gray-400 w-[17%] text-left">R.PnL</div>

                </div>
            ),
            dataIndex: 'holders',
            render: () => <HolderTable/>,
        },
        {
            title: 'TRADES',
            dataIndex: 'trades',
            render: () => <TradeList/>,
        },
        {
            title: 'THREADS',
            dataIndex: 'threads',
            render: () => <ThreadsComponent/>,
        },
        {
            title: 'QUICK BUY',
            dataIndex: 'quickBuy',
            render: () => <QuickBuy amount={amountQuickbuy}/>,
        },
    ];
    return (
        <div className="mt-3">
            <Table
                columns={columns}
                dataSource={listTokens}
                pagination={false}
                rowClassName="text-white"
                className="min-w-full custom-table"
                virtual={true}

            />
        </div>
    );
};

export default TokenInfoComponent;