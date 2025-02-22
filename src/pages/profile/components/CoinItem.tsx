// CoinItem.tsx
import React from 'react';
import {Avatar} from 'antd';
import {useNavigate} from "react-router-dom";

interface CoinItemProps {
    tokenHeld: {
        id: number,
        mediaUrl: string,
        name: string,
        symbol: string,
        totalSupply: string,
        tokenAddress: string,
    };
}

const CoinItem: React.FC<CoinItemProps> = ({tokenHeld}) => {
    const navigate = useNavigate();
    return (
        <div className="flex items-center justify-between  py-2 w-full  max-w-xs mx-auto"
             style={{maxWidth: '290px'}}
        > {/* Thêm max-w-sm để giới hạn chiều rộng */}
            <div className="flex items-center">
                <Avatar
                    src={tokenHeld?.mediaUrl}
                    size={40}
                />
                <div className="flex flex-col  ml-2"> {/* Điều chỉnh margin để thu hẹp */}
                    <span className="text-xs">{tokenHeld?.name}</span> {/* Điều chỉnh kích thước chữ */}
                </div>
            </div>

            <div className="flex flex-col items-end">
                <button
                  className="text-xs cursor-pointer hover:underline"
                  onClick={() => navigate(`/token/${tokenHeld?.tokenAddress}`)}
                >[view coin]</button>
            </div>

        </div>
    );
};

export default CoinItem;
