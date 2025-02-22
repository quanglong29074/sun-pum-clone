import {Skeleton} from "antd";
import {TokenItem} from "../../../components";
import React from "react";
import {useQuery} from "@tanstack/react-query";
import pumpfunApi from "../../../apis/pumpfun-api.ts";

export const TopToken: React.FC = () => {
  const {data: topToken, isLoading} = useQuery({
    queryKey: ["pumpfunApi.token.topToken"],
    queryFn: async () => await pumpfunApi.token.topToken(),
  });

  if (isLoading) return <Skeleton active/>;

  return (
    <section className="container mx-auto flex flex-col lg:flex-row justify-between items-center mb-2 mt-5 p-4 ">
      {/* Left side */}
      <div className="flex flex-col items-center lg:items-start mb-6 gap-y-6 text-center lg:text-left w-full lg:w-1/2">
        <div className="w-full flex justify-center lg:justify-start">
          <h1 className="text-7xl font-bold bg-gradient-to-r from-white to-purple-700 text-transparent bg-clip-text">
            PhoFun
          </h1>
        </div>
        <span className="text-white text-lg lg:text-xl font-semibold leading-relaxed">
          The First Meme Fair Launch Platform on Tron.<br/>
          PUMP TO THE SUN How it works?
        </span>
        <div className="w-full flex justify-center lg:justify-start">
          <button
            className="relative inline-flex items-center px-4 py-2 rounded-xl bg-gradient-to-r from-[#280075] to-[#280075] text-white hover:opacity-90 transition-opacity text-sm lg:text-base"
          >
            <span className="font-bold">Create meme coin with SunAgent</span>
          </button>
        </div>
      </div>

      {/* Right side */}
      <div className="w-full lg:w-1/2 flex flex-col items-center gap-y-6">
        <div className="w-full flex justify-center lg:justify-end">
          <div
            className="flex justify-center items-center bg-gradient-to-r from-[#FF6347] to-[#FFD28F] text-black p-1 rounded-md w-fit mr-0 lg:mr-[6vw] 2xl:mr-[3.5vw] "
          >
  <span className="font-bold text-base lg:text-lg">
    🌟 Sunflare: Illuminate the Peak
  </span>
          </div>

        </div>
        <div className="flex justify-center lg:justify-end w-full">
          {topToken && (
            <TokenItem
              token={topToken}
              className="w-full max-w-[420px] lg:max-w-[470px] max-h-[420px]"
              showDetail={false}
            />
          )}
        </div>
      </div>

    </section>
  );
};