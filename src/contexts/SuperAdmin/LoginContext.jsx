import React, { createContext, useContext, useEffect, useState } from "react";
import { useHttp } from "../../hooks/useHttp";

const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const { postReq } = useHttp();

  const handleLogin = async ({
    endpoint,
    email,
    password,
    roleKey,
    extraStorage = {},
    requireToken = true, // Optional token handling
  }) => {
    try {
      const response = await postReq(endpoint, null, { email, password });

      if (!response || !response.success) {
        return {
          success: false,
          message: response?.message || `${roleKey} login failed`,
        };
      }

      const accessToken = response.data?.accessToken || response.data?.token;

      if (requireToken && !accessToken) {
        return {
          success: false,
          message: "Invalid server response - missing access token",
        };
      }

      if (accessToken) {
        localStorage.setItem("token", accessToken);
      }

      localStorage.setItem("role", roleKey);

      Object.entries(extraStorage).forEach(([key, value]) => {
        if (response.data[value]) {
          localStorage.setItem(key, response.data[value]);
        }
      });

      setIsLogin(true);
      return {
        success: true,
        updatePassword: response.data.updatePassword || false,
        role: roleKey,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || `${roleKey} login failed due to network error`,
      };
    }
  };

  // Super Admin login without requiring token
  const superAdminLogin = (email, password) =>
    handleLogin({
      endpoint: "/api/v1/superadmin/login",
      email,
      password,
      roleKey: "superadmin",
      requireToken: false, // ⬅️ No token expected
    });

  const deptLogin = (email, password) =>
    handleLogin({
      endpoint: "/api/v1/department/login",
      email,
      password,
      roleKey: "department",
      extraStorage: { department: "department" },
    });

  const modLogin = (email, password) =>
    handleLogin({
      endpoint: "/api/v1/moderator/login",
      email,
      password,
      roleKey: "moderator",
    });

  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    setIsLogin(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) {
      setIsLogin(true);
    }
  }, []);

  return (
    <LoginContext.Provider
      value={{
        isLogin,
        setIsLogin,
        superAdminLogin,
        deptLogin,
        modLogin,
        logout,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error("useLogin must be used within a LoginProvider");
  }
  return context;
};
