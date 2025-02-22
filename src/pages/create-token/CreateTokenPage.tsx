import React, {useState} from 'react';
import {Upload, Image} from 'antd';
import {AiOutlineCloudUpload} from 'react-icons/ai';
import {getBase64} from '../../utils';
import toast from 'react-hot-toast';
// import { FaTron } from "react-icons/fa";

const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/gif', 'image/webp'];

const CreateTokenPage: React.FC = () => {
  const [image, setImage] = useState(null);

  const handleChooseFile = ({file}: any) => {
    if (ALLOWED_TYPES.includes(file.type)) {
      getBase64(file, setImage);
    } else {
      toast.error('File Type is not allowed');
    }
  };

  return (
    <div className="p-4 md:p-6 w-full max-w-2xl mx-auto">
      <div className="text-white p-4 md:p-6 flex flex-col items-center text-center gap-y-6 md:gap-y-10">
        <h1
          className="text-3xl md:text-4xl font-semibold bg-gradient-to-r from-white to-purple-700 text-transparent bg-clip-text">
          Launch your token on PhoFun
        </h1>

        <div className="flex flex-wrap justify-center  gap-4 md:gap-10 mb-4">
          <div className="flex items-center gap-2 justify-center">
            <img src="/icon-create1.png" alt="No Presale" className="w-6 md:w-8" />
            <span className="text-sm md:text-base">No Presale</span>
          </div>
          <div className="flex items-center gap-2 justify-center">
            <img src="/icon-create2.png" alt="No Presale" className="w-6 md:w-8" />
            <span className="text-sm md:text-base">No Team Allocation</span>
          </div>
          <div className="flex items-center gap-2  justify-center">
            <img src="/icon-create3.png" alt="No Presale" className="w-6 md:w-8" />
            <span className="text-sm md:text-base">Lower Gas</span>
          </div>
        </div>
      </div>

      <form className="space-y-4 md:space-y-6">
        <div className="text-white p-4 md:p-6 bg-[#151527] rounded-xl  w-full">
          <div className="flex flex-col md:flex-row gap-4 md:gap-6">
            <div>
              <label className="block  mb-2 text-base md:text-lg font-medium">
                Image <span className="text-purple-400">*</span>
              </label>
              <div
                className="bg-[#202038] p-3 md:p-4 rounded-xl cursor-pointer flex items-center justify-center border border-gray-700 w-full md:w-[145px] h-[145px]">
                <Upload
                  accept={ALLOWED_TYPES.join(', ')}
                  showUploadList={false}
                  customRequest={handleChooseFile}
                  className="w-full h-full flex flex-col items-center justify-center text-center bg-[#202038]"
                >
                  {image ? (
                    <Image src={image} height={100} preview={false} className="rounded-lg"/>
                  ) : (
                    <div className="flex flex-col items-center">
                      <AiOutlineCloudUpload size={32} className="text-purple-400 mb-2"/>
                      <p className="text-gray-400 text-xs md:text-xs">JPEG/PNG/WEBP/GIF</p>
                      <p className="text-gray-500 text-xs">Less Than 4MB</p>
                    </div>
                  )}
                </Upload>
              </div>
            </div>

            <div className="flex-1">
              <div className="mb-4">
                <label className="block mb-2">Token Name <span className="text-purple-400">*</span></label>
                <input
                  type="text"
                  maxLength={20}
                  className="w-full bg-[#202038] rounded-lg p-2.5 md:p-3 text-white border border-gray-700 hover:border-purple-600 focus-within:border-purple-600"
                />
              </div>
              <div>
                <label className="block  mb-2">Token Symbol ($Ticker) <span className="text-purple-400">*</span></label>
                <input
                  type="text"
                  maxLength={10}
                  className="w-full bg-[#202038] rounded-lg p-2.5 md:p-3 text-white border border-gray-700 hover:border-purple-600 focus-within:border-purple-600"
                />
              </div>
            </div>
          </div>

          <div className="mt-4">
            <label className="block  mb-2">Token Description <span className="text-purple-400">*</span></label>
            <textarea
              maxLength={256}
              className="w-full bg-[#202038] rounded-lg p-2.5 md:p-3 text-white border border-gray-700 hover:border-purple-600 focus-within:border-purple-600"
            />
          </div>

          <div className="mt-4">
            <label className="block mb-2">Website</label>
            <input
              maxLength={256}
              className="w-full bg-[#202038] rounded-lg p-2.5 md:p-3 text-white border border-gray-700 hover:border-purple-600 focus-within:border-purple-600"
              placeholder="Optional"
            />
          </div>
          <div className="mt-4">
            <label className="block mb-2">Telegram</label>
            <input
              maxLength={256}
              className="w-full bg-[#202038] rounded-lg p-2.5 md:p-3 text-white border border-gray-700 hover:border-purple-600 focus-within:border-purple-600"
              placeholder="Optional"
            />
          </div>
          <div className="mt-4">
            <label className="block mb-2">Twitter</label>
            <input
              maxLength={256}
              className="w-full bg-[#202038] rounded-lg p-2.5 md:p-3 text-white border border-gray-700 hover:border-purple-600 focus-within:border-purple-600"
              placeholder="Optional"
            />
          </div>

          <div className="mt-4">
            <h2 className="text-white font-semibold text-sm">
              Initial <span className="font-bold">Buy</span>{" "}
              <span className="text-gray-400 text-xs">be the first person to buy your token</span>
            </h2>
            <div className="mt-2 p-4 bg-[#1A1A33] rounded-lg  border border-gray-700 hover:border-purple-600 focus-within:border-purple-600">
              <div className="flex justify-between items-center text-gray-400">
                <input
                  type="text"
                  placeholder="Optional. Enter the amount"
                  className="w-[90%] bg-transparent border-none text-white placeholder-gray-500 focus:ring-0 focus:outline-none"
                />
                <div className="flex items-center gap-2 text-white">
                  <span>TRX</span>
                  {/*<FaTron className="text-red-500" size={20} />*/}
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1">Balance: 0 TRX</p>
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-[#6001FF] border border-[#6001FF] cursor-pointer text-white text-base md:text-lg py-2.5 md:py-3 rounded-lg font-medium hover:bg-[#4b00cc] transition disabled:opacity-50"
            >
              Create Token
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateTokenPage;