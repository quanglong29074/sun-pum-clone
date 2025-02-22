import {AppLayout} from "./layouts";
import {Toaster} from "react-hot-toast";
import {
  darkTheme,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import {WagmiProvider} from 'wagmi';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {phoTestnet, wagmiConfig} from "./configs.ts";
import {CustomEthAvatar} from "./components";


const queryClient = new QueryClient();

function App() {

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme()}
          coolMode={true}
          initialChain={phoTestnet}
          avatar={CustomEthAvatar}
          showRecentTransactions
        >
          <AppLayout/>
          <Toaster/>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>

  )
}

export default App
