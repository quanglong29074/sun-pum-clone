import { Modal } from 'antd';
import { useState } from "react";
import {useUser} from "../../../states";
import pumpfunApi from "../../../apis/pumpfun-api.ts";
import {useParams} from "react-router-dom";
import toast from "react-hot-toast";

export default function CommentModal({ isOpen, onCancel, onOk }: { isOpen: boolean, onCancel: any, onOk: any }) {
  const [comment, setComment] = useState('');
  const {address} = useParams();
  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const {user} = useUser()
  const handlePostReply = async () => {
    const payload = {
      content: comment,
      tokenAddress: address,
    };

    try {
      // Sửa lỗi: Truyền payload trực tiếp thay vì bọc trong 'body'
      await pumpfunApi.tokenComments.postComment(payload);
      onOk();  // Gọi callback khi thành công
      toast.success("Comment posted successfully!");
      setComment("")
    } catch (error: any) {
      console.error("Error posting comment:", error.message);
    }
  };




  return (
    <div>
      <Modal
        open={isOpen}
        onCancel={onCancel}
        footer={null}
        className="rounded-md  "
      >
        <div className="flex items-center justify-center">
          <div className="text-white rounded-md w-full">
            {/* Add Comment Title */}
            <h2 className="text-sm font-semibold mb-4">Add Comment</h2>

            {/* Comment Input */}
            <textarea
              value={comment}
              onChange={handleCommentChange}
              rows={4}
              placeholder="Write your comment..."
              className="w-full p-3 mb-4 rounded-md bg-gray-700 border border-gray-600 text-white placeholder-gray-400"
            />
            {/* Post Reply Button */}
            <div className="flex justify-between space-x-4 mt-4">
              <button
                onClick={handlePostReply}
                disabled={user.id === 0 || comment.trim() === ''}
                className="w-full cursor-pointer py-2 rounded-md bg-green-400 text-gray-900 disabled:bg-gray-400 disabled:text-gray-500 disabled:cursor-not-allowed"
              >
                Post Reply
              </button>
            </div>


            {/* Cancel Button */}
            <div className="mt-2 text-center">
              <button
                onClick={onCancel}
                className="w-full cursor-pointer py-2 text-white hover:font-bold"
              >
                [Cancel]
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
