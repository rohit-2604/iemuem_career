import React, { createContext, useContext, useEffect, useState } from "react";
import { useHttp } from "../../hooks/useHttp";
import Cookies from "js-cookie";

const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [authToken, setAuthToken] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const { postReq } = useHttp();

  const storeAuthData = (token, role) => {
    // Clear previous
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");

    // Store new

; // Store role in sessionStorage

    setAuthToken(token);
    setUserRole(role);
  };

  const handleLogin = async ({
    endpoint,
    email,
    password,
    roleKey,
    extraStorage = {},
  }) => {
    try {
      if (!email || !password) {
        return { success: false, message: "Email and password are required" };
      }

      const response = await postReq(endpoint, { email, password });

      if (!response?.success) {
        return { success: false, message: response?.message || "Login failed" };
      }

      let raw = response?.data?.data ?? response?.data ?? {};
      let token = "";

      if (typeof raw === "string") {
        token = raw;
        raw = {};
      } else {
        token = raw?.token || raw?.token;
      }

      if (!token) {
        return { success: false, message: "No token received from server" };
      }

      storeAuthData(token, roleKey);

      const extraData = {};
      Object.entries(extraStorage).forEach(([storageKey, responseKey]) => {
        const value = raw[responseKey];
        if (value !== undefined && value !== null) {
          extraData[storageKey] = String(value);
        }
      });

      setIsLogin(true);

      return {
        success: true,
        role: roleKey,
        token,
        data: extraData,
        updatePassword: raw?.updatePassword ?? false,
      };
    } catch (error) {
      return {
        success: false,
        message:
          error?.response?.data?.message || error.message || "Network error occurred",
      };
    }
  };

  const superAdminLogin = (email, password) =>
    handleLogin({
      endpoint: "/api/v1/superadmin/login",
      email,
      password,
      roleKey: "superadmin",
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

  const userLogin = (email, password) =>
    handleLogin({
      endpoint: "/api/v1/user/login",
      email,
      password,
      roleKey: "user",
    });

  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    setIsLogin(false);
    setAuthToken(null);
    setUserRole(null);
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const role = sessionStorage.getItem("role");
    if (token) {
      setIsLogin(true);
      setAuthToken(token);
      setUserRole(role);
    }
    setIsLoading(false);
  }, []);

  if (isLoading) return null;

  return (
    <LoginContext.Provider
      value={{
        isLogin,
        isLoading,
        authToken,
        userRole,
        setIsLogin,
        superAdminLogin,
        deptLogin,
        modLogin,
        userLogin,
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
