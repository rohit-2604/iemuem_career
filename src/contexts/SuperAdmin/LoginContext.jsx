import React, { createContext, useContext, useEffect, useState } from "react";
import { useHttp } from "../../hooks/useHttp";

const LoginContext = createContext();

// 🔐 Save token + extra data to storage
function setTokenStorage(token, roleKey, extraData = {}) {

  try {
    if (!token || typeof token !== "string") {
      console.warn("⚠️ Invalid token passed to setTokenStorage:", token);
      return false;
    }

    // Local and Session Storage
    localStorage.setItem("token", token);
    localStorage.setItem("role", roleKey);
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("role", roleKey);

    // Cookies
    document.cookie = `token=${encodeURIComponent(token)}; path=/; max-age=${60 * 60 * 24 * 7}`;
    document.cookie = `role=${encodeURIComponent(roleKey)}; path=/; max-age=${60 * 60 * 24 * 7}`;

    // Extra data
    Object.entries(extraData).forEach(([key, value]) => {
      const stringValue = String(value);
      localStorage.setItem(key, stringValue);
      sessionStorage.setItem(key, stringValue);
      document.cookie = `${key}=${encodeURIComponent(stringValue)}; path=/; max-age=${60 * 60 * 24 * 7}`;
    });

    return true;
  } catch (err) {
    console.error("❌ Failed to store authentication data:", err);
    return false;
  }
}

const getTokenFromStorage = () => {
  try {
    const token =
      localStorage.getItem("token") ||
      sessionStorage.getItem("token") ||
      document.cookie.match(/(^| )token=([^;]+)/)?.[2] ||
      null;

    console.log("📥 Retrieved token from storage:", token);
    return token;
  } catch (error) {
    console.error("❌ Failed to get token from storage:", error);
    return null;
  }
};

const getRoleFromStorage = () => {
  try {
    return (
      localStorage.getItem("role") ||
      sessionStorage.getItem("role") ||
      document.cookie.match(/(^| )role=([^;]+)/)?.[2] ||
      null
    );
  } catch (error) {
    console.error("❌ Failed to get role from storage:", error);
    return null;
  }
};

const clearAllStorage = () => {
  try {
    const authKeys = ["token", "role", "department"];
    authKeys.forEach((key) => {
      localStorage.removeItem(key);
      sessionStorage.removeItem(key);
      document.cookie = `${key}=; path=/; max-age=0`;
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

      const raw = response?.data?.data ?? response?.data;
      console.log("🧩 Extracted raw data:", raw);

      let accessToken = null;
      let extraDataSource = {};

      if (typeof raw === "string") {
        accessToken = raw;
      } else if (typeof raw === "object" && raw !== null) {
        accessToken = raw.token || raw.accessToken || raw.access_token;
        extraDataSource = raw;
      }

      if (typeof accessToken !== "string") {
        accessToken = String(accessToken);
      }

      if (!accessToken) {
        console.error("❌ No token found in response:", raw);
        return { success: false, message: "Authentication token not received" };
      }

      // 📋 Extract extra fields
      const extraData = {};
      Object.entries(extraStorage).forEach(([storageKey, responseKey]) => {
        const value = extraDataSource[responseKey];
        if (value !== undefined && value !== null) {
          extraData[storageKey] = String(value);
        }
      });

      // 💾 Save to storage
      const saved = setTokenStorage(accessToken, roleKey, extraData);
      if (!saved) {
        console.warn("⚠️ Failed to save token/extra data to storage");
        return { success: false, message: "Failed to store authentication data" };
      }

      console.log("✅ Login successful");
      console.log("🧾 Saved Values:");
      console.log("LocalStorage:", localStorage.getItem("token"));
      console.log("SessionStorage:", sessionStorage.getItem("token"));
      console.log("Cookies:", document.cookie);

      setIsLogin(true);

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
