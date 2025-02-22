export type Token = {
  name: string,
  symbol: string,
  tokenAddress: string,
  creatorAddress: string,
  decimals: number,
  id: number,
  description: string | null,
  mediaUrl: string | null,
  telegramUrl: string | null,
  twitterUrl: string | null,
  websiteUrl: string | null,
  createdAt: string,
  updatedAt: string,
  totalSupply: number,
  txHash: string,
  repliesCount?: number,
}

export type Candle = {
  open: number,
  high: number,
  low: number,
  close: number,
  volume: number,
  time: number,
}


export type FundingHistory = {
  id: number,
  txHash: string,
  tokenAddress: string,
  type: number,
  amountWeth: string,
  amountToken: string,
  blockNumber: number,
  timestamp: number,
  price: string,
  createdAt: string,
  updatedAt: string,
  from: string,
}

export type TokenComment = {
  id: number;
  tokenAddress: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  user: {
    address: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    role: string;
  };
  userId: number;
};
