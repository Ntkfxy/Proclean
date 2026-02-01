import React, { useState, useEffect, ReactNode } from "react";
import { UserContext } from "./UserContext";
import tokenService from "../service/token.service";
import { UserInfo } from "../types";

interface UserContextProviderProps {
  children: ReactNode;
}

export const UserContextProvider: React.FC<UserContextProviderProps> = ({ children }) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(getUser);

  const logIn = (user: UserInfo) => setUserInfo(user);

  const logout = () => {
    setUserInfo(null);
    tokenService.removeUser();
  };

  function getUser(): UserInfo | null {
    const saveUser = tokenService.getUser() || null;
    return saveUser;
  }

  useEffect(() => {
    tokenService.setUser(userInfo);
  }, [userInfo]);

  return (
    <UserContext.Provider value={{ userInfo, logIn, logout }}>
      {children}
    </UserContext.Provider>
  );
};
