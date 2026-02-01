import axios, { InternalAxiosRequestConfig } from "axios";
import tokenService from "./token.service";

const baseURL = import.meta.env.VITE_BASE_URL;

const instance = axios.create({
  baseURL,
});

instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = tokenService.getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
