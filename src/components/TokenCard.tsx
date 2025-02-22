import React from "react";

const CryptoCard: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-[#1a0123] to-[#25012f] text-white rounded-2xl w-full mb-3 shadow-lg border border-gray-700">
      {/* Ảnh */}
      <div className="relative">
        <img
          src="/token-demo.jpg" // Thay thế bằng link ảnh thật
          alt="Profile"
          className="rounded-t-xl w-full h-70 object-cover"
        />
        {/* Badge */}
        <div className="absolute top-2 right-2 bg-cyan-500 text-black text-sm font-semibold px-2 py-1 rounded-full">
          +0.94% ⬆
        </div>
      </div>

      {/* Nội dung */}
      <div className="p-3">
        <p className="text-sm text-gray-400">
          Created By: <span className="text-blue-400">TF7s...sqnN</span>
        </p>

        <h3 className="text-lg font-bold mt-1">Meme on Tron ($Meme)</h3>
        <p className="text-gray-400 text-sm">Meme</p>

        {/* Market Cap */}
        <div className="mt-3">
          <p className="text-sm">
            Market Cap: <span className="font-bold text-white">$8.05k</span>{" "}
            <span className="text-gray-400">(0.32%)</span>
          </p>

          {/* Progress Bar */}
          <div className="w-full bg-gray-700 h-2 rounded-full mt-1">
            <div className="bg-blue-500 h-2 rounded-full" style={{ width: "32%" }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CryptoCard;
