import React, {useState} from 'react';
import CommentModal from "./AddComment.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import pumpfunApi from "../../../apis/pumpfun-api.ts";
import {useUser} from "../../../states";
import toast from "react-hot-toast";
import {Pagination} from "antd";


const ListComments: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {user} = useUser()
  const {address} = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState({
    page: 0,
    limit: 10,
    sortOrder: "desc",
    tokenAddress: address
  });
  const {data: listcomment, refetch} = useQuery({
    queryKey: ["pumfunApi.token.list", searchParams],
    queryFn: async ({queryKey}) => await pumpfunApi.tokenComments.list(queryKey[1])
  });

  const handleReplyClick = () => {
    if (user.id === 0) {
      // If user.id is 0, show a login prompt and do not open the modal
      toast("Please log in to post a reply!", { icon: "⚠️" });
    } else {
      // Otherwise, open the modal to post a reply
      setIsModalOpen(true);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOk = () => {
    // Logic xử lý khi nhấn OK
    setIsModalOpen(false);
    refetch();
  };
  return (
    <div className="text-gray-100 p-4 w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          className="bg-[#5CC4C9] text-slate-900 cursor-pointer px-4 py-2 rounded-md flex items-center"
          onClick={() => {
            setSearchParams(prev => ({
              ...prev,
              sortOrder: prev.sortOrder === "desc" ? "asc" : "desc"
            }));
          }}
        >
          sort: time ({searchParams.sortOrder})
          <span className="ml-2">{searchParams.sortOrder === "desc" ? "↓" : "↑"}</span>
        </button>

        <button
          className="bg-[#5CC4C9] cursor-pointer text-gray-900 px-4 py-2 rounded-md"
          onClick={handleReplyClick}
        >
          {user.id === 0 ? "Login to post to reply" : "Post a reply"}
        </button>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {listcomment?.contents.map((comment) => (

          <div key={comment.id} className="border-b border-gray-800 pb-4">
            <div className="flex items-start gap-3">
              {/* User Badge */}
              <div
                className="text-xs py-1 rounded cursor-pointer hover:underline"
                onClick={() => navigate(`/profile/${comment.user.address}`)}
              >
                {comment.user.address.length > 10
                  ? `${comment.user.address.slice(0, 6)}...${comment.user.address.slice(-4)}`
                  : comment.user.address}
              </div>



              {/* Timestamp */}
              <span className="text-gray-500 text-sm">
                {new Date(comment.createdAt).toLocaleTimeString('vi-VN')}
              </span>


            </div>

            {/* Comment Content */}
            <div className="mt-2 text-gray-300">
              {comment.content}
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center my-6">
        <Pagination
          current={(searchParams?.page ?? 0) + 1}
          pageSize={searchParams?.limit ?? 10}
          total={listcomment?.total ?? 0}
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
      <CommentModal isOpen={isModalOpen} onCancel={handleCancel} onOk={handleOk}/>
    </div>
  );
};

export default ListComments;