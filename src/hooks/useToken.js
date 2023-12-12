import { useCallback, useEffect, useState } from "react";

export let logoutUser = () => {};

export const getTokenFromAPP = () => {
  const token = localStorage.getItem("token");
  const userInfo = localStorage.getItem("userInfo");
  if (token && userInfo) {
    const userData = JSON.parse(userInfo);
    if (userData?._id && userData?.email) {
      return {
        token: token,
        userInfo: userData,
      };
    }
  } else {
    logoutUser();
  }
};

const getUserInfo = async () => {
  const { token, userInfo } = await getTokenFromAPP();
  return {
    token,
    userInfo,
  };
};

export default function useToken() {
  const getToken = useCallback(() => {
    const tokenString = localStorage.getItem("token");
    try {
      return tokenString;
    } catch (error) {
      logoutUser();
    }
  }, []);

  const [token, setToken] = useState(undefined);
  
  const [userInfo, setUserInfo] = useState(null);

  const saveToken = useCallback(({ token, userInfo }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    setToken(token);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("token");
    setUserInfo(null);
    setToken(null);
  }, []);

  useEffect(() => {
    logoutUser = logout;
  }, [logout]);

  useEffect(() => {
    if (token) {
      getUserInfo().then((data) => {
        setUserInfo(data);
      });
    }
  }, [token]);

  useEffect(() => {
    setToken(getToken());
  }, [false]);

  return {
    setToken: saveToken,
    token,
    logout,
    isLogin: token ? true : false,
    isINIT: token !== undefined,
    setUserInfo,
    userInfo,
  };
}
