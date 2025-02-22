import { Link } from "react-router-dom";
import { useState } from "react";
import { FaTelegramPlane, FaDiscord } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { BiTime } from "react-icons/bi";
import { WalletButton } from "./index.ts";
import {Avatar} from "antd";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const transactions = [
    { id: 1, user: "TK2n...CBAQ", action: "Sold", amount: "1,464.93", token: "TRX", name: "SUNDOG", image: "/favicon-32x32.png" },
    { id: 2, user: "AB3x...DXYZ", action: "Bought", amount: "2,512.70", token: "ETH", name: "MOONDOG", image: "/favicon-32x32.png" },
    { id: 3, user: "X9Lp...TUVP", action: "Sold", amount: "785.40", token: "BTC", name: "STARFOX", image: "/favicon-32x32.png" },
    { id: 4, user: "WQ7m...GHJK", action: "Bought", amount: "3,920.25", token: "BNB", name: "SOLARCAT", image: "/favicon-32x32.png" },
    { id: 5, user: "PL8z...QWER", action: "Sold", amount: "1,000.00", token: "USDT", name: "LUNADOG", image: "/favicon-32x32.png" },
    { id: 6, user: "PL8z...QWER", action: "Sold", amount: "1,000.00", token: "USDT", name: "LUNADOG", image: "/favicon-32x32.png" },
    { id: 7, user: "PL8z...QWER", action: "Sold", amount: "1,000.00", token: "USDT", name: "LUNADOG", image: "/favicon-32x32.png" },
    { id: 8, user: "PL8z...QWER", action: "Sold", amount: "1,000.00", token: "USDT", name: "LUNADOG", image: "/favicon-32x32.png" },
    { id: 9, user: "PL8z...QWER", action: "Sold", amount: "1,000.00", token: "USDT", name: "LUNADOG", image: "/favicon-32x32.png" },

  ];

  return (
    <header className="w-full text-white">
      {/* Transaction Ticker */}
      <div className="w-full overflow-hidden">
        <div className="flex items-center space-x-4 bg-[#1B182B] whitespace-nowrap p-4 scrollbar-hide">
          {transactions.map((trade, index) => (
            <div key={index} className="flex items-center space-x-2 text-xs md:text-sm shrink-0">
              <span>{trade.user}</span>
              <span>{trade.action}</span>
              <span>{trade.amount}</span>
              <span>of</span>
              <span>{trade.token}</span>
              {index < transactions.length - 1 && <span className="text-gray-400 mx-2">|</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Main Navigation */}
      <div className="p-4 mx-auto">
        <div className="flex flex-col min-[1160px]:flex-row min-[1160px]:items-center min-[1160px]:justify-between">
          {/* Logo and Mobile Menu Button */}
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 ">
              <Avatar src="/favicon-32x32.png" size={35} />
              <span className="text-2xl font-bold">PhoFun</span>
            </Link>
            <button
              className="max-[1160px]:block hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-16 6h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Navigation Links and Social Icons */}
          <div className={`${isMenuOpen ? 'flex' : 'hidden'} min-[1160px]:flex flex-col min-[1160px]:flex-row items-center mt-4 min-[1160px]:mt-0`}>
            <nav className="flex flex-col min-[1160px]:flex-row items-center space-y-4 min-[1160px]:space-y-0 min-[1160px]:space-x-6">
              <Link to="/" className="text-white hover:text-purple-400">Home</Link>
              <Link to="/launch" className="text-gray-500 hover:text-purple-400">Launch</Link>
              <Link to="/ranking" className="text-gray-500 hover:text-purple-400">Ranking</Link>
              <Link to="/referral" className="text-gray-500 hover:text-purple-400">Referral</Link>
              <Link to="/sunboost" className="text-gray-500 hover:text-purple-400">SunBoost</Link>
              <div className="flex items-center">
                <Link to="/sunagent" className="text-gray-500 hover:text-purple-400">SunAgent</Link>
                <span className="ml-1 text-xs px-1 bg-green-500 text-white rounded">BETA</span>
              </div>
            </nav>

            {/* Social Icons */}
            <div className="flex items-center space-x-4 text-gray-400 mt-4 min-[1160px]:mt-0 min-[1160px]:ml-6">
              <Link to="/discord" className="hover:text-purple-400 transition-colors p-2 rounded bg-[#280075] border border-[#4600CC]">
                <FaDiscord className="w-5 h-5" />
              </Link>
              <Link to="/telegram" className="hover:text-purple-400 transition-colors p-2 rounded bg-[#280075] border border-[#4600CC]">
                <FaTelegramPlane className="w-5 h-5" />
              </Link>
              <Link to="/twitter" className="hover:text-purple-400 transition-colors p-2 rounded bg-[#280075] border border-[#4600CC]">
                <FaXTwitter className="w-5 h-5" />
              </Link>
              <Link to="/time" className="hover:text-purple-400 transition-colors p-2 rounded bg-[#280075] border border-[#4600CC]">
                <BiTime className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Wallet Button */}
          <div className={`${isMenuOpen ? 'flex justify-center' : 'hidden'} min-[1160px]:flex items-center mt-4 min-[1160px]:mt-0`}>
            <WalletButton />
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;