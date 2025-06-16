import React, { createContext, useContext, useEffect, useState } from "react";
import { useHttp } from "../../hooks/useHttp";

const LoginContext = createContext();

// 🔐 Save token and extra data to both localStorage and sessionStorage
const setTokenStorage = (token, role, extraData = {}) => {
  try {
    console.log("💾 Saving token to storage:", token);
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("role", role);

    Object.entries(extraData).forEach(([key, value]) => {
      if (value) {
        localStorage.setItem(key, value);
        sessionStorage.setItem(key, value);
      }
    });

    return true;
  } catch (error) {
    console.error("❌ Failed to save token/data:", error);
    return false;
  }
};

const getTokenFromStorage = () => {
  try {
    return localStorage.getItem("token") || sessionStorage.getItem("token") || null;
  } catch (error) {
    console.error("❌ Failed to get token from storage:", error);
    return null;
  }
};

const getRoleFromStorage = () => {
  try {
    return localStorage.getItem("role") || sessionStorage.getItem("role") || null;
  } catch (error) {
    console.error("❌ Failed to get role from storage:", error);
    return null;
  }
};

const clearAllStorage = () => {
  try {
    const authKeys = ['token', 'role', 'department'];
    authKeys.forEach(key => {
      localStorage.removeItem(key);
      sessionStorage.removeItem(key);
    });
    console.log("🧹 Auth storage cleared");
  } catch (error) {
    console.error("❌ Failed to clear storage:", error);
  }
};

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

      const response = await postReq(endpoint, null, { email, password });
      console.log("📦 Full login response:", response);

      if (!response?.success) {
        return { success: false, message: response?.message || "Login failed" };
      }

      // 🧠 Safely extract token from response
      const raw = response?.data?.data ?? response?.data;
      console.log("📥 Raw response.data:", raw);

      const accessToken = typeof raw === "string"
        ? raw
        : raw?.token || raw?.accessToken || raw?.access_token;

      if (!accessToken) {
        console.error("❌ No token found in response:", raw);
        return { success: false, message: "Authentication token not received" };
      }

      // 📦 Extract extra fields to store
      const extraData = {};
      if (typeof raw === "object" && raw !== null) {
        Object.entries(extraStorage).forEach(([storageKey, responseKey]) => {
          const value = raw[responseKey];
          if (value !== undefined && value !== null) {
            extraData[storageKey] = String(value);
          }
        });
      }

      const saved = setTokenStorage(accessToken, roleKey, extraData);
      if (!saved) {
        return { success: false, message: "Failed to store authentication data" };
      }

      setIsLogin(true);
      console.log("✅ Login successful");

      return {
        success: true,
        token: accessToken,
        role: roleKey,
        data: extraData,
      };
    } catch (error) {
      console.error("❌ Login error:", error);
      return {
        success: false,
        message: error?.response?.data?.message || error.message || "Network error occurred",
      };
    }
  };

  // 🚪 Role-based login methods
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
    clearAllStorage();
    setIsLogin(false);

    try {
      localStorage.setItem("logout-event", Date.now().toString());
      localStorage.removeItem("logout-event");
      console.log("📢 Logout event broadcasted");
    } catch (err) {
      console.warn("⚠️ Failed to broadcast logout:", err);
    }
  };

  // 🌀 Auto-login on refresh
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const token = getTokenFromStorage();
        const role = getRoleFromStorage();

        if (token && role) {
          setIsLogin(true);
          console.log("✅ Session restored for role:", role);
        } else {
          console.log("ℹ️ No active session found");
          clearAllStorage();
        }
      } catch (error) {
        console.error("❌ Failed to initialize auth:", error);
        clearAllStorage();
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    const handleStorageChange = (e) => {
      if (e.key === "logout-event") {
        console.log("📣 Logout detected from another tab");
        clearAllStorage();
        setIsLogin(false);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
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
        getTokenFromStorage,
        getRoleFromStorage,
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
