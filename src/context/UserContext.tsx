import { createContext } from "react";
import { UserInfo } from "../types";

interface UserContextType {
  userInfo: UserInfo | null;
  logIn: (user: UserInfo) => void;
  logout: () => void;
}

export const UserContext = createContext<UserContextType>({
  userInfo: null,
  logIn: () => {},
  logout: () => {},
});
