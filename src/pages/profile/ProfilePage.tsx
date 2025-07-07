import React, {useState} from "react";
import {Avatar, Pagination} from "antd";
import CoinItem from "./components/CoinItem.tsx";
import TokenItem from "../../components/TokenItem.tsx";
import {useQuery} from "@tanstack/react-query";
import pumpfunApi from "../../apis/pumpfun-api.ts";
import {Token} from "../../types.ts";
import {useParams} from "react-router-dom";

const ProfilePage: React.FC = () => {
  //
  // const {address} = useParams();
  // const [searchParams, setSearchParams] = useState({
  //   page: 0,
  //   limit: 10,
  //   creatorAddress: address
  // });
  // const {data: listTokens} = useQuery({
  //   queryKey: ["pumfunApi.token.list", searchParams],
  //   queryFn: async ({queryKey}) => await pumpfunApi.token.list(queryKey[1])
  // });
  //
  // const {data: listTokenHelds} = useQuery({
  //   queryKey: ["pumpfunApi.user.listTokenHeld", address],
  //   queryFn: async ({queryKey}) => await pumpfunApi.user.listTokenHeld(String(queryKey[1]))
  // });
  //
  // const [activeTab, setActiveTab] = useState("coinsHeld");
  // const [isCoinsVisible, setIsCoinsVisible] = useState(true);
  //
  // const handleTabClick = (tab: string) => {
  //   setActiveTab(tab);
  // };
  // const handleHideCoins = () => {
  //   setIsCoinsVisible(!isCoinsVisible);
  // };
  //
  //
  // return (
  //   <div className="flex flex-col items-center justify-center bg-[#303841] text-white p-6">
  //     <div className="rounded-lg p-6">
  //       <div className="flex flex-col justify-center items-center sm:flex-row sm:items-center">
  //         <Avatar src='/favicon-32x32.png' size={80} className="object-contain max-w-full h-auto"/>
  //         <div className="mt-4 sm:ml-4 text-center sm:text-left">
  //           <h2 className="text-sm font-medium">@Gr3Rsb</h2>
  //           <p className="text-gray-400 text-xs">0 followers</p>
  //           <div
  //             className="flex items-center justify-center sm:justify-start space-x-4 text-xs max-w-xs break-words">
  //             <p>🔥Boost your coin's visibility on Pump.Fun by bumping your [🟢Buy/🔴Sell] transactions</p>
  //           </div>
  //
  //           <div className="flex flex-col sm:flex-row items-center sm:items-center space-x-4 text-xs">
  //             <p className="text-red-400">likes received: 0 ❤️</p>
  //             <p className="text-green-400 flex items-center">
  //               mentions received: 0
  //               <svg
  //                 width="12" height="12" viewBox="0 0 15 15" fill="none"
  //                 xmlns="http://www.w3.org/2000/svg"
  //                 style={{marginLeft: '5px'}}
  //               >
  //                 <path
  //                   d="M12.5 3L2.5 3.00002C1.67157 3.00002 1 3.6716 1 4.50002V9.50003C1 10.3285 1.67157 11 2.5 11H7.50003C7.63264 11 7.75982 11.0527 7.85358 11.1465L10 13.2929V11.5C10 11.2239 10.2239 11 10.5 11H12.5C13.3284 11 14 10.3285 14 9.50003V4.5C14 3.67157 13.3284 3 12.5 3ZM2.49999 2.00002L12.5 2C13.8807 2 15 3.11929 15 4.5V9.50003C15 10.8807 13.8807 12 12.5 12H11V14.5C11 14.7022 10.8782 14.8845 10.6913 14.9619C10.5045 15.0393 10.2894 14.9965 10.1464 14.8536L7.29292 12H2.5C1.11929 12 0 10.8807 0 9.50003V4.50002C0 3.11931 1.11928 2.00003 2.49999 2.00002Z"
  //                   fill="currentColor" fillRule="evenodd" clipRule="evenodd"
  //                 ></path>
  //               </svg>
  //             </p>
  //           </div>
  //         </div>
  //       </div>
  //
  //       <div
  //         className="mt-3 p-2 rounded-sm text-xs sm:text-sm md:text-base font-mono border border-gray-500 overflow-x-auto">
  //                   <span className="inline-block whitespace-nowrap text-[10px] sm:text-xs md:text-sm">
  //                       {'Gr3RSbVYYY5W63DbVFcoMPghGb8MDBctb4RYMPiPaxCr'}
  //                   </span>
  //       </div>
  //       <p className="text-white text-[8px] sm:text-[9px] md:text-[10px] text-right mt-1 cursor-pointer">
  //         view on solscan ↗
  //       </p>
  //
  //       <div className="flex justify-center mt-4">
  //         <button
  //           onClick={() => handleTabClick("coinsHeld")}
  //           className={`px-3 py-1 text-xs cursor-pointer ${activeTab === "coinsHeld" ? "bg-[#5CC4C9] text-black rounded" : "text-gray-400 rounded"}`}
  //         >
  //           coins held
  //         </button>
  //         <button
  //           onClick={() => handleTabClick("coinsCreated")}
  //           className={`px-3 py-1 text-xs cursor-pointer ${activeTab === "coinsCreated" ? "bg-[#5CC4C9] text-black rounded" : "text-gray-400 rounded"}`}
  //         >
  //           coins created
  //         </button>
  //       </div>
  //
  //       {activeTab === "coinsHeld" && (
  //         <div
  //           className="text-sm text-right mt-2 items-center w-full max-w-xs cursor-pointer"
  //           onClick={handleHideCoins}
  //           style={{maxWidth: '290px', marginLeft: 'auto', marginRight: 'auto'}}
  //         >
  //           {isCoinsVisible ? "[hide dust coins]" : "[show dust coins]"}
  //         </div>
  //       )}
  //       {activeTab === "coinsHeld" && isCoinsVisible && (
  //         <div className="mt-4 justify-center">
  //           {listTokenHelds && listTokenHelds.map((tokenHeld) => (
  //             // Kiểm tra kiểu dữ liệu của coin nếu cần thiết
  //             <CoinItem key={tokenHeld.id} tokenHeld={tokenHeld}/>
  //           ))}
  //         </div>
  //       )}
  //
  //       {activeTab === "coinsCreated" && (
  //         <div className="mt-4 flex flex-col items-center">
  //           {listTokens?.contents?.map((token: Token) => (
  //             <TokenItem
  //               key={token.id}
  //               className="w-[300px]  mb-4"
  //               token={token}
  //             />
  //           ))}
  //         </div>
  //       )}
  //     </div>
  //     {activeTab === "coinsCreated" && (listTokens?.total ?? 0) > 0 && (
  //       <div className="flex justify-center my-6">
  //         <Pagination
  //           current={(searchParams?.page ?? 0) + 1}
  //           pageSize={searchParams?.limit ?? 10}
  //           total={listTokens?.total ?? 0}
  //           onChange={(page) => setSearchParams((prev) => ({
  //             ...prev,
  //             page: page - 1,
  //           }))}
  //           showSizeChanger={false}
  //           className="custom-pagination text-emerald-300"
  //           showLessItems
  //           showTitle={false}
  //         />
  //       </div>
  //     )}
  //   </div>
  // );
};

export default ProfilePage;
