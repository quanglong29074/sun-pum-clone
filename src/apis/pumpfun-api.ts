import axiosClient from "./axios-client.ts";
import {Candle, FundingHistory, Token, TokenComment} from "../types.ts";

const pumpfunApi = {
  upload: {
    getPreSignedUrl: async (key: string): Promise<{ url: string, fileUrl: string }> => {
      return await axiosClient.post('/upload/presigned-url', {key})
    },
  },
  token: {
    create: async (data: {
      txHash: string,
      description?: string,
      mediaUrl?: string,
      telegramUrl?: string,
      twitterUrl?: string,
      websiteUrl?: string,
    }) => {
      return await axiosClient.post('/token', data)
    },

    list: async (params = {}): Promise<{
      contents: Token[],
      total: number,
      page: number,
      limit: number
    }> => {
      return await axiosClient.get('/token', {params})
    },

    one: async (address: string): Promise<Token> => {
      return await axiosClient.get(`/token/${address}`)
    },
    listHolders: async (address: string): Promise<{
      holder: string,
      balance: number,
      percentage: number
    }[]> => {
      return await axiosClient.get(`/token/${address}/holders`)
    },
    topToken: async (): Promise<Token> => {
      return await axiosClient.get(`/token/top`)
    },
  },
  fundingHistories: {
    list: async (params = {}): Promise<{
      page: number,
      limit: number,
      total: number,
      contents: FundingHistory[]
    }> => {
      return await axiosClient.get('/funding-histories', {params})
    },
    candleData: async (params = {}): Promise<Candle[]> => {
      return await axiosClient.get('/funding-histories/candle', {params})
    }
  },
  user: {
    connectWallet: async (message: string, signature: `0x${string}`): Promise<{
      jwt: string,
      user: {
        id: number,
        address: string,
        role: string,
      }
    }> => {
      return await axiosClient.post('/user/connect-wallet', {message, signature})
    },
    me: async (): Promise<{
      id: number,
      address: string,
      role: string,
    }> => {
      return await axiosClient.get('/user/me')
    },
    listTokenHeld: async (address: string): Promise<{
      id: number,
      mediaUrl: string,
      name: string,
      symbol: string,
      totalSupply: string,
      tokenAddress: string,
    }[]> => {
      return await axiosClient.get(`/user/${address}/tokens-held`)
    }
  },
  tokenComments: {

    list: async (params = {}): Promise<{
      contents: TokenComment[],
      total: number,
      page: number,
      limit: number
    }> => {
      return await axiosClient.get('/token-comments', {params})
    },
    postComment: async (body = {}) => {
      return await axiosClient.post('/token-comments', body)
    },
  },


}

export default pumpfunApi;