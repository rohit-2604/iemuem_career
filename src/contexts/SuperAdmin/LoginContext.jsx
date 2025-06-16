import React, { createContext, useContext, useEffect, useState } from "react";
import { useHttp } from "../../hooks/useHttp";
import Cookies from "js-cookie";

const LoginContext = createContext();

// Utility: Save token and user data
const setTokenStorage = (token, role, extraData = {}) => {
  try {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("role", role);

    // Set cookie for 1 day
    const expirationDate = new Date(Date.now() + 24 * 60 * 60 * 1000).toUTCString();
    const cookieOptions = `; expires=${expirationDate}; path=/; secure; samesite=strict`;

    document.cookie = `token=${token}${cookieOptions}`;
    document.cookie = `role=${role}${cookieOptions}`;

    for (const [key, value] of Object.entries(extraData)) {
      if (value) {
        localStorage.setItem(key, value);
        sessionStorage.setItem(key, value);
        document.cookie = `${key}=${value}${cookieOptions}`;
      }
    }

    console.log("✅ Token and data saved to all storage methods");
    return true;
  } catch (error) {
    console.error("❌ Error saving to storage:", error);
    return false;
  }
};


// Utility: Read token from localStorage, sessionStorage, or cookie
const getTokenFromStorage = () => {
  return (
    localStorage.getItem("token") ||
    sessionStorage.getItem("token") ||
    (() => {
      const tokenMatch = document.cookie.match(/(?:^|;\s*)token=([^;]*)/);
      return tokenMatch ? tokenMatch[1] : null;
    })()
  );
};

// Clear all storage and cookies on logout
function clearAllStorage() {
  // Clear localStorage and sessionStorage
  localStorage.clear();
  sessionStorage.clear();

  // Clear all cookies
  document.cookie.split(";").forEach(cookie => {
    const name = cookie.split("=")[0].trim();
    if (name) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`;
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${window.location.hostname};`;
    }
  });
}

export const LoginProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const { postReq } = useHttp();

  const handleLogin = async ({
    endpoint,
    email,
    password,
    roleKey,
    extraStorage = {},
    requireToken = true,
  }) => {
    try {
      console.log(`🔐 Logging in as ${roleKey}...`);

      const response = await postReq(endpoint, null, { email, password });
      console.log(response.data);

      if (!response || !response.success) {
        return {
          success: false,
          message: response?.message || "Login failed",
        };
      }

      // Try all possible token paths
      const possibleTokenPaths = [
        response.data?.accessToken,
        response.data?.token,
        response.data?.access_token,
        response.data?.authToken,
        response.data?.jwt,
        response.data?.bearerToken,
        response.data?.data?.accessToken,
        response.data?.data?.token,
        response.data?.data?.access_token,
        response.data?.user?.token,
        response.data?.user?.accessToken,
        response.data?.auth?.token,
        response.data?.auth?.accessToken,
        response.data?.authentication?.token,
        response.data?.authentication?.accessToken,
        response.token,
        response.accessToken,
        response.jwt,
      ];

      let accessToken = possibleTokenPaths.find((t) => typeof t === "string");

      if (!accessToken && !requireToken) {
        accessToken = `${roleKey}-dummy-token-${Date.now()}`;
        console.warn(`⚠️ No token from server. Using dummy token: ${accessToken}`);
      }

      if (requireToken && !accessToken) {
        return {
          success: false,
          message: "Token not found in server response",
        };
      }

      const extraData = {};
      for (const [key, valueKey] of Object.entries(extraStorage)) {
        extraData[key] = response.data?.[valueKey] || response[valueKey];
      }

      const saved = setTokenStorage(accessToken, roleKey, extraData);

      if (!saved) {
        return { success: false, message: "Failed to save authentication data" };
      }

      setIsLogin(true);

      return {
        success: true,
        token: accessToken,
        role: roleKey,
        updatePassword: response.data?.updatePassword || false,
      };
    } catch (error) {
      console.error("❌ Login error:", error);
      return {
        success: false,
        message: error.message || "Login failed",
      };
    }
  };

  const superAdminLogin = (email, password) =>
    handleLogin({
      endpoint: "/api/v1/superadmin/login",
      email,
      password,
      roleKey: "superadmin",
      requireToken: false,
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
    console.log("🚪 Starting logout process...");
    
    // Clear all storage
    clearAllStorage();
    
    // Update login state
    setIsLogin(false);
    
    // Broadcast logout to other tabs
    try {
      localStorage.setItem("logout-event", Date.now().toString());
      console.log("📢 Logout event broadcasted to other tabs");
    } catch (error) {
      console.warn("⚠️ Could not broadcast logout event:", error);
    }
    
    console.log("✅ Logout completed");
  };

  useEffect(() => {
    const token = getTokenFromStorage();
    const role = localStorage.getItem("role") || sessionStorage.getItem("role");

    if (token && role) {
      setIsLogin(true);
      console.log("✅ Auth session restored");
    } else {
      console.log("ℹ️ No auth session found");
    }

    const syncLogout = (e) => {
      if (e.key === "logout-event") {
        console.log("📣 Logout detected in another tab");
        clearAllStorage();
        setIsLogin(false);
      }
    };

    window.addEventListener("storage", syncLogout);
    return () => window.removeEventListener("storage", syncLogout);
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
        getTokenFromStorage,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new error("useLogin must be used within a LoginProvider");
  }
  return context;
};