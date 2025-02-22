import React, {useCallback, useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {TopToken} from "./components/TopToken.tsx";
import {useSearchParams} from "react-router-dom";
import {TokenSort} from "./components/TokenSort.tsx";
import {Col, Row, Skeleton} from "antd";
import {TokenItem} from "../../components";
import pumpfunApi from "../../apis/pumpfun-api.ts";
import {Token} from "../../types";
import useMqtt from "../../hooks/useMqtt.ts";
import {debounce} from "lodash";
import CryptoCard from "../../components/TokenCard.tsx";
// import { FaSortAmountDownAlt, FaSync } from "react-icons/fa"; // Import icons từ react-icons

const HomePage: React.FC = () => {
  const [newestToken, setNewestToken] = useState<any>(null);
  // const [isSortOpen, setIsSortOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams({
    page: "0",
    limit: "48",
    sortOrder: "desc",
    q: ""
  });
  const [inputValue, setInputValue] = useState('');

  const params = {
    page: Number(searchParams.get("page")) || 0,
    limit: Number(searchParams.get("limit")) || 30,
    sortOrder: searchParams.get("sortOrder") || "desc",
    q: searchParams.get("q") || ""
  };

  const {data: listTokens, refetch, isLoading} = useQuery({
    queryKey: ["pumfunApi.token.list", params],
    queryFn: async ({queryKey}) => await pumpfunApi.token.list(queryKey[1]),
  });

  const handleSortChange = (sortOrder: string) => {
    setSearchParams(prev => {
      prev.set("sortOrder", sortOrder);
      prev.set("page", "0"); // Reset về trang đầu khi sort
      return prev;
    });
  };
  const {contents: tokens = []} = listTokens || {};

  useMqtt(async (type: 'token' | 'trade', data: any) => {
    if (type === 'token') {
      setNewestToken(data);
      setTimeout(() => setNewestToken(null), 1000);
    } else {
      try {
        const token = await pumpfunApi.token.one(data.tokenAddress)
        setNewestToken(token)
        setTimeout(() => setNewestToken(null), 1000);
      } catch (err) {
        console.log(err)
      }
    }
    await refetch()
  })


  // const handlePageChange = (page: number) => {
  //   setSearchParams(prev => {
  //     prev.set("page", String(page - 1));
  //     return prev;
  //   });
  // };

  const debouncedSetSearch = useCallback(
    debounce((value) => {
      setSearchParams(prev => ({
        ...prev,
        q: value
      }));
    }, 500), []);

  useEffect(() => {
    return () => {
      debouncedSetSearch.cancel();
    };
  }, [debouncedSetSearch]);


  return (
    <div className="w-[80%] mx-auto">
      <TopToken/>
      <div className="flex flex-col md:flex-row items-center justify-between p-4 gap-4">
        <div className="flex gap-2 w-full md:w-1/3">
          <input
            value={inputValue}
            onChange={(e) => {
              const value = e.target.value;
              setInputValue(value);
              debouncedSetSearch(value);
            }}
            type="text"
            placeholder="search for token"
            className="flex-1 px-4 py-2 rounded-lg bg-[#151527]/60 text-[#E0E0E0] placeholder-[#E0E0E0]/60 outline-none focus:ring-2 border border-gray-500 "
          />
        </div>
        <div className="w-full md:w-auto flex justify-center md:justify-start gap-2">
          {/*<label*/}
          {/*  className="flex items-center gap-2 px-4 py-2 bg-[#151527] cursor-pointer rounded-lg border border-[#4600CC] text-white font-medium hover:text-[#6001FF] transition-colors"*/}
          {/*>*/}
          {/*  <input type="checkbox" />*/}
          {/*  <span>{"Launched Time"}</span>*/}
          {/*</label>*/}
          <TokenSort
            options={[
              { value: "Launched Time", label: "Launched Time" },
              { value: "newest", label: "newest" },
              { value: "oldest", label: "oldest" },
            ]}
            onSortChange={handleSortChange}
          />

          {/* Sort Button */}
          {/*<button className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#151527] border border-[#4600CC] text-white hover:text-[#6001FF] transition-colors">*/}
          {/*  <FaSortAmountDownAlt size={20} />*/}
          {/*</button>*/}

          {/*/!* Refresh Button *!/*/}
          {/*<button className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#151527] border border-[#4600CC] text-white hover:text-[#6001FF] transition-colors">*/}
          {/*  <FaSync size={20} />*/}
          {/*</button>*/}
        </div>
      </div>


      <Row gutter={12} className='px-4'>
        {
          newestToken && (
            <Col xl={8} lg={8} md={12} sm={24} xs={24}>
              <TokenItem
                className="w-full max-h-[300px] mb-4 "
                token={newestToken}
                isShaking={true}
              />
            </Col>
          )
        }
        {isLoading ? <Skeleton/> : tokens.map((token: Token) => (
          <Col xl={8} lg={8} md={12} sm={24} xs={24} key={token.id}>
            <div className="flex justify-center items-center">
              <CryptoCard />
            </div>
          </Col>
        ))}
      </Row>
      <div className="flex justify-center my-6">
        <button
          className=" px-14 py-4 rounded-lg bg-[#6001FF] text-white hover:opacity-90 transition-opacity text-xl lg:text-base"
        >
          <span className="font-bold">Load More</span>
        </button>
      </div>
    </div>
  );
};

export default HomePage;