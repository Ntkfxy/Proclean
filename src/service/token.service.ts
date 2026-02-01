import { Cookies } from "react-cookie";
import { UserInfo } from "../types";

const cookies = new Cookies();

const getUser = (): UserInfo | null => {
  const user = cookies.get("user");
  if (!user) return null;
  
  if (typeof user === "string") {
    try {
      return JSON.parse(user);
    } catch {
      return null;
    }
  }
  return user;
};

const getAccessToken = (): string => {
  const user = getUser();
  return user?.accessToken || "";
};

const setUser = (user: UserInfo | null) => {
  if (!user) return removeUser();

  cookies.set(
    "user",
    {
      id: user.id || user._id,
      username: user.username,
      role: user.role,
      accessToken: user.accessToken,
    },
    {
      path: "/",
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    }
  );
};

const removeUser = () => {
  cookies.remove("user", { path: "/" });
};

const tokenService = {
  getUser,
  getAccessToken,
  setUser,
  removeUser,
};

export default tokenService;
