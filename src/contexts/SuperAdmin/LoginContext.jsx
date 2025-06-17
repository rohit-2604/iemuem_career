import React, { createContext, useContext, useEffect, useState } from "react";
import { useHttp } from "../../hooks/useHttp";
import Cookies from "js-cookie";

const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { postReq } = useHttp();

  const storeAuthData = (token, role, keepLoggedIn = false) => {
    // Clear previous tokens
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    localStorage.removeItem("role");
    sessionStorage.removeItem("role");
    Cookies.remove("token");
    Cookies.remove("role");

    // Always save to sessionStorage
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("role", role);

    if (keepLoggedIn) {
      // Save in cookies with 7 days expiry
      Cookies.set("token", token, { expires: 7 });
      Cookies.set("role", role, { expires: 7 });
    }
  };

  const handleLogin = async ({
    endpoint,
    email,
    password,
    roleKey,
    extraStorage = {},
    keepLoggedIn = false,
  }) => {
    try {
      console.log(`🔐 Logging in as ${roleKey}...`);

      if (!email || !password) {
        return { success: false, message: "Email and password are required" };
      }

      const response = await postReq(endpoint, {
        data: { email, password },
      });

      if (!response?.success) {
        return { success: false, message: response?.message || "Login failed" };
      }

      // ✅ Handle both raw string or object response
      let raw = response?.data?.data ?? response?.data ?? {};
      let token = "";

      if (typeof raw === "string") {
        token = raw;
        raw = {}; // no other metadata if it's just a string
      } else {
        token = raw?.token || raw?.accessToken;
      }

      if (!token) {
        return { success: false, message: "No token received from server" };
      }

      console.log("📦 Raw login response:", raw);
      console.log("🔑 Token:", token);

      // Store auth data
      storeAuthData(token, roleKey, keepLoggedIn);

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
      console.error("❌ Login error:", error);
      return {
        success: false,
        message:
          error?.response?.data?.message || error.message || "Network error occurred",
      };
    }
  };

  const superAdminLogin = (email, password, keepLoggedIn = false) =>
    handleLogin({
      endpoint: "/api/v1/superadmin/login",
      email,
      password,
      roleKey: "superadmin",
      keepLoggedIn,
    });

  const deptLogin = (email, password, keepLoggedIn = false) =>
    handleLogin({
      endpoint: "/api/v1/department/login",
      email,
      password,
      roleKey: "department",
      extraStorage: { department: "department" },
      keepLoggedIn,
    });

  const modLogin = (email, password, keepLoggedIn = false) =>
    handleLogin({
      endpoint: "/api/v1/moderator/login",
      email,
      password,
      roleKey: "moderator",
      keepLoggedIn,
    });

  const userLogin = (email, password, keepLoggedIn = false) =>
    handleLogin({
      endpoint: "/api/v1/user/login",
      email,
      password,
      roleKey: "user",
      keepLoggedIn,
    });

  const logout = () => {
    console.log("🚪 Logging out...");
    localStorage.clear();
    sessionStorage.clear();
    Cookies.remove("token");
    Cookies.remove("role");
    setIsLogin(false);
  };

  useEffect(() => {
    // Check for token in cookies first, then sessionStorage
    const token = Cookies.get("token") || sessionStorage.getItem("token");
    if (token) {
      setIsLogin(true);
    }
    setIsLoading(false);
  }, []);

  if (isLoading) return null;

  return (
    <LoginContext.Provider
      value={{
        isLogin,
        setIsLogin,
        superAdminLogin,
        deptLogin,
        modLogin,
        userLogin,
        logout,
        isLoading,
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
