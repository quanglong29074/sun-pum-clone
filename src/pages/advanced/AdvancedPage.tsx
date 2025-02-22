import React, {useCallback, useEffect} from "react";
import {TokenSort} from "../home/components/TokenSort.tsx"
import TokenInfoComponent from "./components/TokenInfoComponent.tsx"
import {CiFilter} from "react-icons/ci";
import {CiSettings} from "react-icons/ci";
import {IoMdArrowDropdown} from "react-icons/io";
import {useState} from "react";
import ModalFilter from "./components/ModalFilter.tsx";
import AboutToGraduate from "./components/AboutToGraduate.tsx";
import pumpfunApi from "../../apis/pumpfun-api.ts";
import {useInfiniteQuery} from "@tanstack/react-query";
import { useInView } from 'react-intersection-observer';
import {useSearchParams} from "react-router-dom";
const AdvancedPage: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams({
        page: "0",
        limit: "10",
        sortOrder: "desc",
        q: ""
    });
    const params = {
        page: Number(searchParams.get("page")) || 0,
        limit: Number(searchParams.get("limit")) || 30,
        sortOrder: searchParams.get("sortOrder") || "desc",
        q: searchParams.get("q") || ""
    };
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        refetch
    } = useInfiniteQuery({
        queryKey: ['tokens'],
        queryFn: async ({ pageParam = 0 }) => {
            return await pumpfunApi.token.list({
                page: pageParam,
                limit: params.limit,
                sortOrder: params.sortOrder,
                q: params.q
            });
        },
        getNextPageParam: (lastPage) => {
            const nextPage = lastPage.page + 1;
            const totalPages = Math.ceil(lastPage.total / lastPage.limit);
            return nextPage < totalPages ? nextPage : undefined;
        },
        initialPageParam: 0,
    });
    const { ref, inView } = useInView({
        threshold: 0.1,
        rootMargin: '100px',
    });
    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);
    const [isModalFilterOpen, setIsModalFilterOpen] = useState(false);
    const [amountQuickbuy, setAmountQuickbuy] = useState("0.1");
    const showModalFilterOpen = () => {
        setIsModalFilterOpen(true);
    }
    const handleModalFilterClose = () => {
        setIsModalFilterOpen(false);
    }
    const handleOkModalFilter = () => {
        setIsModalFilterOpen(false);
    }
    const handleSortChange = useCallback((newSortOrder: string) => {
        setSearchParams(prev => {
            const newParams = new URLSearchParams(prev);
            newParams.set("sortOrder", newSortOrder);
            newParams.set("page", "0");
            return newParams;
        });
    }, [setSearchParams]);
    const currentTokens = data?.pages.reduce((acc:any, page:any) => {
        return [...acc, ...page.contents];
    }, []) || [];
    useEffect(() => {
        refetch();
    }, [params.sortOrder, refetch]);
    return (
        <div className="w-full flex flex-col">
            <div className=" flex items-center justify-center p-1">
                <form className="flex gap-2 w-full md:w-1/3">
                    <input
                        type="text"
                        placeholder="search for token"
                        className="flex-1 px-4 py-2 rounded-lg bg-[#3a4750] text-[#E0E0E0] placeholder-[#E0E0E0]/60 border-0 outline-none focus:ring-2 focus:ring-[#5CC4C9]"
                    />
                    <button
                        type="submit"
                        className="px-6 py-2 bg-emerald-300 text-slate-900 rounded-lg font-medium hover:bg-emerald-400 transition-colors"
                    >
                        search
                    </button>
                </form>
            </div>
            <h1 className="text-2xl font-bold mb-4 text-[#5CC4C9]">About to Graduate</h1>
            <AboutToGraduate listTokens={currentTokens}/>
            <div className="mt-5 flex p-3  justify-between">
                <TokenSort
                    options={[
                        {value: "desc", label: "newest"},
                        {value: "asc", label: "oldest"},
                    ]}
                    onSortChange={handleSortChange} // Add onSortChange prop
                />
                <div className="flex gap-2 text-xm items-center">
                    <button onClick={showModalFilterOpen}
                            className="cursor-pointer flex text-white items-center border-2 rounded-xl p-1">
                        <CiFilter/>Filter<IoMdArrowDropdown/>
                    </button>
                    <div className="text-white">Quick buy</div>
                    <div className="flex p-1">
                        <input onChange={(e) => setAmountQuickbuy(e.target.value)}
                               className="w-16 border-2 text-white px-3 rounded-md" type="number"/>
                    </div>
                    <CiSettings className="text-white size-6"/>
                </div>
            </div>
            <TokenInfoComponent
                listTokens={currentTokens}
                amountQuickbuy={amountQuickbuy || 0.1}
            />
            <ModalFilter
                isOpen={isModalFilterOpen}
                onCancel={handleModalFilterClose}
                onOk={handleOkModalFilter}
            />
            <div
                ref={ref}
                className="w-full py-4 text-center text-white"
            >
                {isFetchingNextPage ? (
                    <div>Loading more tokens...</div>
                ) : hasNextPage ? (
                    <div>Scroll for more</div>
                ) : (
                    <div>No more tokens</div>
                )}
            </div>
        </div>
    )
}
export default AdvancedPage;