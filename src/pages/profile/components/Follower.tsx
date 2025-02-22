import React from 'react';
import {Avatar} from 'antd';

interface FollowerProps {
    follower: {
        img: string;
        name: string;
    };
}

const Follower: React.FC<FollowerProps> = ({follower}) => {
    return (
        <div className="flex items-center justify-center gap-2 w-full pb-3">
            {/* Ảnh */}

            <Avatar
                src={follower.img || 'token-demo.jpg'}
                size={40}
            />
            {/* Nội dung */}
            <div className="flex items-center gap-1 w-40">
                <p className="text-sm font-medium">{follower.name}</p>
                <p className="text-gray-400 text-xs whitespace-nowrap">0 followers</p>
            </div>
        </div>
    );
};

export default Follower;
