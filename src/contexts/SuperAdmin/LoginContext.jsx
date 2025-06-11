// src/context/SuperAdmin/LoginContext.jsx

import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useHttp } from "../../hooks/useHttp";

const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const { postReq } = useHttp();
  const navigate = useNavigate();

  const token = localStorage.getItem("token") || sessionStorage.getItem("token");

  // Generic function to handle login
  const handleLogin = async ({
    endpoint,
    email,
    password,
    successRedirect,
    updatePasswordRedirect,
    roleKey,
    extraStorage = {},
  }) => {
    try {
      // FIX: Don't send token for login requests, send credentials in body
      const response = await postReq(endpoint, null, { email, password });

      // FIX: Better response validation
      if (!response || !response.success) {
        console.error(`${roleKey} login failed:`, response?.message || 'Unknown error');
        return { 
          success: false, 
          message: response?.message || `${roleKey} login failed` 
        };
      }

      // FIX: Validate response data structure
      if (!response.data || !response.data.accessToken) {
        console.error(`${roleKey} login failed: Invalid response structure`);
        return { 
          success: false, 
          message: 'Invalid server response - missing access token' 
        };
      }

      const accessToken = response.data.accessToken;

      // FIX: Handle password update scenario
      if (response.data.updatePassword) {
        localStorage.setItem("token", accessToken);
        localStorage.setItem("role", roleKey);

        // FIX: Safely handle extra storage
        Object.entries(extraStorage).forEach(([key, value]) => {
          if (response.data[value]) {
            localStorage.setItem(key, response.data[value]);
          }
        });

        navigate(updatePasswordRedirect, { state: { role: roleKey } });
        return { success: true, updatePassword: true, role: roleKey };
      }

      // FIX: Handle successful login
      localStorage.setItem("token", accessToken);
      localStorage.setItem("role", roleKey);

      // FIX: Safely handle extra storage
      Object.entries(extraStorage).forEach(([key, value]) => {
        if (response.data[value]) {
          localStorage.setItem(key, response.data[value]);
        }
      });

      setIsLogin(true); // FIX: Update login state
      navigate(successRedirect);
      return { success: true, role: roleKey };

    } catch (error) {
      console.error(`${roleKey} login error:`, error);
      return { 
        success: false, 
        message: error.message || `${roleKey} login failed due to network error` 
      };
    }
  };

  // SuperAdmin Login
  const superAdminLogin = (email, password) =>
    handleLogin({
      endpoint: "api/v1/superadmin/login", // FIX: Added proper endpoint
      email,
      password,
      successRedirect: "/superadmin/dashboard", // FIX: Better redirect path
      updatePasswordRedirect: "/update-password",
      roleKey: "superadmin",
    });

  // Department Login
  const deptLogin = (email, password) =>
    handleLogin({
      endpoint: "api/v1/department/login", // FIX: Added proper endpoint
      email,
      password,
      successRedirect: "/department/dashboard",
      updatePasswordRedirect: "/update-password",
      roleKey: "department",
      extraStorage: { department: "department" },
    });

  // Moderator Login
  const modLogin = (email, password) =>
    handleLogin({
      endpoint: "api/v1/moderator/login",
      email,
      password,
      successRedirect: "/moderator/dashboard",
      updatePasswordRedirect: "/update-password",
      roleKey: "moderator",
    });

  // FIX: Logout function
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("department");
    sessionStorage.clear();
    setIsLogin(false);
    navigate("/superadmin/login");
  };

  // Maintain login state across reload
  useEffect(() => {
    if (token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [token]);

  return (
    <LoginContext.Provider
      value={{
        isLogin,
        setIsLogin,
        superAdminLogin,
        deptLogin,
        modLogin,
        logout, // FIX: Added logout function
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