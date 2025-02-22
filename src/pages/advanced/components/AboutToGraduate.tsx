import {useRef} from 'react';
import {IoMdTime} from "react-icons/io";
import {useQueries} from '@tanstack/react-query';
import pumpfunApi from "../../../apis/pumpfun-api.ts";
import { formatDistanceToNow } from 'date-fns';


export default function AboutToGraduate({listTokens}: { listTokens: any }) {
    const formatTimeAgo = (dateString: string) => {
        return formatDistanceToNow(new Date(dateString), { addSuffix: true }).replace('about ', '');;
    };
    const volumeQueries = useQueries({
        queries: (listTokens || []).map((token: any) => ({
            queryKey: ['pumfunApi.token.listVolume', {tokenAddress: token.tokenAddress, interval: 86400}],
            queryFn: async ({queryKey}: {
                queryKey: any
            }) => await pumpfunApi.fundingHistories.candleData(queryKey[1] ?? {}),
            select: (data:any) => data?.[0]?.volume || '0'
        }))
    });
    const formatVolume = (volume: any) => {
        return new Intl.NumberFormat('en-US', {
            notation: "compact",
            maximumFractionDigits: 2
        }).format(volume);
    };
    const scrollRef = useRef<HTMLDivElement>(null);

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({left: -200, behavior: 'smooth'});
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({left: 200, behavior: 'smooth'});
        }
    };
    return (
        <div className="flex items-center w-full">
            <button onClick={scrollLeft} className="p-1 bg-gray-600 text-white rounded-l-lg">
                &lt;
            </button>
            <div className="overflow-x-auto scrollbar-hidden w-full " ref={scrollRef}>
                <div className="flex space-x-4">
                    {listTokens?.map((item:any, index:any) => (
                        <div key={index}
                             className="flex items-center p-2 gap-5 bg-gray-800 rounded-lg shadow-lg transition-transform transform hover:scale-105 min-w-[200px]">
                            <img src={item.mediaUrl || 'token-demo.jpg'} alt={`Coin ${index + 1}`}
                                 className="w-16 h-16 rounded"/>
                            <div className="flex flex-col">
                                <div className="flex justify-between gap-3">
                                    <p className="text-xs font-semibold text-[#5CC4C9]">MC</p>
                                    <span className="text-white text-xs">${formatVolume(item.totalSupply)}</span>
                                </div>
                                <div className="flex justify-between gap-5">
                                    <p className="text-sm text-[#5CC4C9]">V</p>
                                    <span className="text-white text-xs">
                                         {`$${formatVolume(volumeQueries[index].data)}`}
</span>
                                </div>
                                <p className="text-xs text-gray-400 flex items-center justify-between"><IoMdTime
                                    className="text-[#5CC4C9]"/>{formatTimeAgo(item.createdAt)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <button onClick={scrollRight} className="p-1 bg-gray-600 text-white rounded-r-lg">
                &gt;
            </button>
        </div>
    );
}