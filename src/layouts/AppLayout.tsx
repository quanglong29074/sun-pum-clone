import {useEffect} from "react";
import {Route, Routes} from "react-router-dom";
import {Footer, Header} from "../components";
import {CreateTokenPage, HomePage, TokenPage, AdvancedPage, ProfilePage} from "../pages";
import {JWT_LOCAL_STORAGE_KEY} from "../apis/axios-client.ts";
import {useAccount} from "wagmi";
import pumpfunApi from "../apis/pumpfun-api.ts";
import {useUser} from "../states";
import toast from "react-hot-toast";


const AppLayout: React.FC = () => {
  //sync wallet
  const account = useAccount();
  const {setUser, clearUser} = useUser()
  const syncAuthStatus = async () => {
    try {
      if (!account.isConnected || !account.address) {
        clearUser()
        window.localStorage.removeItem(JWT_LOCAL_STORAGE_KEY)
        return;
      }
      const jwt = window.localStorage.getItem(JWT_LOCAL_STORAGE_KEY);
      if (!jwt) return;
      const userData = await pumpfunApi.user.me()
      if (userData.address !== account.address.toLowerCase()) {
        clearUser()
        window.localStorage.removeItem(JWT_LOCAL_STORAGE_KEY)
        toast("Account changed, please login again!")
        return;
      }
      setUser(userData)
    } catch (err: any) {
      console.log(err.message)
    }
  }
  useEffect(() => {
    syncAuthStatus().then()
  }, [account]);
  return (
    <div className="bg-[#090b1a]">
      <Header/>
      <div className='min-h-screen'>
        <Routes>
          <Route index element={<HomePage/>}/>
          <Route path="token/:address" element={<TokenPage/>}/>
          <Route path="/launch" element={<CreateTokenPage/>}/>
          <Route path="/advanced" element={<AdvancedPage/>}/>
          <Route path="profile/:address" element={<ProfilePage/>}/>
        </Routes>
      </div>
      <Footer/>
    </div>

  )
}
export default AppLayout;