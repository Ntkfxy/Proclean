import { AxiosResponse } from "axios";
import api from "./api";
import tokenService from "./token.service";
import { UserInfo } from "../types";

const API_URL = import.meta.env.VITE_AUTH_API;

const register = async (username: string, password: string, role: string = "Author"): Promise<AxiosResponse> => {
  return await api.post(API_URL + "/register", {
    username,
    password,
    role,
  });
};

const login = async (username: string, password: string): Promise<UserInfo> => {
  const response = await api.post<UserInfo>(API_URL + "/login", {
    username,
    password,
  });

  const { status, data } = response;

  if (status === 200 && data?.accessToken) {
    tokenService.setUser(data);
  }

  return data;
};

const logout = () => {
  tokenService.removeUser();
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
