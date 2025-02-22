  import {
  AvatarComponent,
} from '@rainbow-me/rainbowkit';
import {Avatar} from "antd";

const CustomEthAvatar: AvatarComponent = ({ensImage, size}) => {
  return ensImage ? (
    <img
      src={ensImage}
      width={size}
      height={size}
      style={{borderRadius: 999}}
      alt="avatar"
    />
  ) : (
    <Avatar
      size={size}
      src={'/favicon-32x32.png'}
      />
  );

};

export default CustomEthAvatar;