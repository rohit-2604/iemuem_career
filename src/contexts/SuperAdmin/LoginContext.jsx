import React, { createContext, useContext, useEffect, useState } from "react";
import { useHttp } from "../../hooks/useHttp";

const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { postReq } = useHttp();

const handleLogin = async ({
  endpoint,
  email,
  password,
  roleKey,
  extraStorage = {},
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

    console.log("📦 Raw login response:", raw);
    console.log("🔑 Token:", token);

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

  const logout = () => {
    console.log("🚪 Logging out...");
    setIsLogin(false);
  };

  useEffect(() => {
    // No session restore logic needed
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
