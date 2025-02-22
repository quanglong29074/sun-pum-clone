import axios from "axios";
import * as querystring from "querystring";

export const JWT_LOCAL_STORAGE_KEY = "pho_fun_auth"
export const API_URL = import.meta.env.VITE_API_URL ?? "https://pho-be.vinhomes.co.uk/api"
const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: (params) => querystring.stringify(params),
});


axiosClient.interceptors.request.use((config) => {
  const accessToken = window.localStorage.getItem(JWT_LOCAL_STORAGE_KEY);
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

axiosClient.interceptors.response.use((response) => {
  if (response && response.data) {
    return response.data;
  }

  return response;
}, (error) => {
  // Handle errors
  const errorMessage = "Something went wrong!"

  if (error?.response?.data) {
    throw error.response.data;
  }
  throw errorMessage;
});

export default axiosClient;