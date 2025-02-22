import React from "react";
import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import pumpfunApi from "../../../apis/pumpfun-api.ts";
import {Skeleton, Tooltip} from "antd";
import {minimizeAddress} from "../../../utils.ts";

const TokenHolder: React.FC = () => {
  const {address} = useParams<{ address: string }>();
  const {data = [], isLoading} = useQuery({
    queryKey: ['pumpfunApi.token.listHolders', address],
    enabled: !!address,
    queryFn: async ({queryKey}) => await pumpfunApi.token.listHolders(queryKey[1] ?? "")
  })
  return (
    <div>
      <p className='font-bold text-gray-400 text-lg my-3'>holders distribution</p>
      {
        isLoading ? <Skeleton active/> : data.map((holder, index) => (
          <div key={holder?.holder} className='w-full flex items-center justify-between text-gray-400 mb-3'>
            <div>{index + 1}. {minimizeAddress(holder?.holder ?? "")}</div>
            <Tooltip title={holder?.balance?.toLocaleString()}>
              <div>{holder?.percentage?.toLocaleString()}%</div>
            </Tooltip>
          </div>
        ))
      }
    </div>
  )
}
export default TokenHolder;