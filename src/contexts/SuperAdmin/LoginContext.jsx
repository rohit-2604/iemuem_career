import React, { createContext, useContext, useEffect, useState } from "react";
import { useHttp } from "../../hooks/useHttp";

const LoginContext = createContext();

const saveRoleAndExtras = (roleKey, extraData = {}) => {
  try {
    // Store role and additional data
    localStorage.setItem("role", roleKey);
    sessionStorage.setItem("role", roleKey);
    document.cookie = `role=${encodeURIComponent(roleKey)}; path=/; max-age=${60 * 60 * 24 * 7}`;

    Object.entries(extraData).forEach(([key, value]) => {
      const val = String(value);
      localStorage.setItem(key, val);
      sessionStorage.setItem(key, val);
      document.cookie = `${key}=${encodeURIComponent(val)}; path=/; max-age=${60 * 60 * 24 * 7}`;
    });

    return true;
  } catch (err) {
    console.error("❌ Failed to store role/extra data:", err);
    return false;
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
    const keys = ["role", "department"];
    keys.forEach((key) => {
      localStorage.removeItem(key);
      sessionStorage.removeItem(key);
      document.cookie = `${key}=; path=/; max-age=0`;
    });
    console.log("🧹 Cleared auth data (no token)");
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

      const response = await postReq(endpoint, {
        data: { email, password },
      });

      if (!response?.success) {
        return { success: false, message: response?.message || "Login failed" };
      }

      const raw = response?.data?.data ?? response?.data ?? {};
      console.log("📦 Raw login response:", raw);

      const extraData = {};
      Object.entries(extraStorage).forEach(([storageKey, responseKey]) => {
        const value = raw[responseKey];
        if (value !== undefined && value !== null) {
          extraData[storageKey] = String(value);
        }
      });

      const saved = saveRoleAndExtras(roleKey, extraData);
      if (!saved) {
        return { success: false, message: "Failed to store session data" };
      }

      console.log("✅ Login successful (no token)");
      setIsLogin(true);

      return {
        success: true,
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

  const logout = () => {
    console.log("🚪 Logging out...");
    clearAllStorage();
    setIsLogin(false);
    try {
      localStorage.setItem("logout-event", Date.now().toString());
      localStorage.removeItem("logout-event");
    } catch (err) {
      console.warn("⚠️ Failed to broadcast logout:", err);
    }
  };

  useEffect(() => {
    const initializeSession = () => {
      try {
        const role = getRoleFromStorage();
        if (role) {
          setIsLogin(true);
          console.log("✅ Session restored for role:", role);
        } else {
          clearAllStorage();
        }
      } catch (err) {
        console.error("❌ Session initialization failed:", err);
        clearAllStorage();
      } finally {
        setIsLoading(false);
      }
    };

    initializeSession();

    const handleStorageChange = (e) => {
      if (e.key === "logout-event") {
        console.log("📣 Detected logout from another tab");
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
