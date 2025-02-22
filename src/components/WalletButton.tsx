import React, {useEffect} from "react";
import {minimizeAddress} from "../utils.ts";
import {useAccountModal, useChainModal, useConnectModal} from "@rainbow-me/rainbowkit";
import {useAccount, useSignMessage} from "wagmi";
import {useUser} from "../states";
import pumpfunApi from "../apis/pumpfun-api.ts";
import {JWT_LOCAL_STORAGE_KEY} from "../apis/axios-client.ts";
import toast from "react-hot-toast";

const WalletButton: React.FC = () => {
  const {openConnectModal} = useConnectModal();
  const {openAccountModal} = useAccountModal();
  const {openChainModal} = useChainModal();
  const account = useAccount();
  const [loading, setLoading] = React.useState(false);
  const {user, setUser} = useUser()
  const {signMessageAsync} = useSignMessage()
  const handleLogin = async () => {
    try {
      setLoading(true);
      const message = "Login to go pho fun"
      const signature = await signMessageAsync({
        message
      })
      const loginResp = await pumpfunApi.user.connectWallet(message, signature)
      window.localStorage.setItem(JWT_LOCAL_STORAGE_KEY, loginResp.jwt)
      setUser(loginResp.user)
      toast.success('Login success')
    } catch (err: any) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }
  const getButtonAction = () => {
    if (!account.isConnected) return openConnectModal;
    if (account.chainId !== +import.meta.env.VITE_CHAIN_ID) return openChainModal;
    if (user.id === 0) return handleLogin;
    return openAccountModal;
  }
  useEffect(() => {
    if (!account.isConnected) return;
    if (account.chainId !== +import.meta.env.VITE_CHAIN_ID && openChainModal) {
      openChainModal();
    }
  }, [account, openChainModal]);

  const getButtonText = () => {
    if (!account.isConnected || !account.address) return 'connect wallet';
    if (account.chainId !== +import.meta.env.VITE_CHAIN_ID) return 'wrong network';
    if (user.id === 0) return '[sign message]';
    return `[${minimizeAddress(account.address)}]`;
  }


  return (
    <button
      className={`cursor-pointer p-2 bg-[#6001FF] rounded-sm transition duration-300 hover:opacity-90 ${
        account.isConnected && account.chainId !== +import.meta.env.VITE_CHAIN_ID
          ? "text-red-500"
          : ""
      }`}
      onClick={getButtonAction()}
      disabled={loading}
    >
      {loading ? "[signing in...]" : getButtonText()}
    </button>

  )
}
export default WalletButton;