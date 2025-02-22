import {Chain, getDefaultConfig} from "@rainbow-me/rainbowkit";

export const phoTestnet = {
  id: +import.meta.env.VITE_CHAIN_ID,
  name: 'Pho testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Pho',
    symbol: 'Pho',
  },
  rpcUrls: {
    default: {http: [import.meta.env.VITE_RPC_URL]},
  },
  blockExplorers: {
    default: {
      name: 'PhoScan Testnet',
      url: 'https://testnet.phoscan.org',
      apiUrl: 'https://testnet.phoscan.org/api',
    },
  },
  testnet: true,
} as const satisfies Chain;


export const wagmiConfig = getDefaultConfig({
  appName: 'Go Pho Fun',
  projectId: 'f47700e45c81d8b9ff877f8eb3f88de8',
  chains: [phoTestnet],
  ssr: false,
});

