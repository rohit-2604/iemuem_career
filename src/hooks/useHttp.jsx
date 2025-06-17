import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorPopup } from "../utils/ErrorPopup";

// Create Context for error handling
const ErrorHandleContext = createContext();

// Hook to use the error handler
export const useErrorHandle = () => useContext(ErrorHandleContext);

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { showErrorPopup } = useErrorHandle() || {};
  const navigate = useNavigate();

  const mainURL =  import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  const buildUrl = (path) => {
    const trimmedPath = path.startsWith("/") ? path.slice(1) : path;
    return `${mainURL}/${trimmedPath}`;
  };

  const handleResponse = async (response) => {
    if ([401, 403].includes(response.status)) {
      const errorText = await response.text();
      let errorMessage;

      try {
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.message || `Error ${response.status}: ${response.statusText}`;
      } catch {
        errorMessage = errorText || `Error ${response.status}: ${response.statusText}`;
      }

      showErrorPopup?.(errorMessage);
      localStorage.clear();
      sessionStorage.clear();
      navigate("/superadmin/login");
      return null;
    }

    try {
      const json = await response.json();
      return {
        success: json.success ?? true,
        message: json.message,
        data: json.data ?? json,
      };
    } catch {
      showErrorPopup?.("Invalid response format from server.");
      return null;
    }
  };

  const request = async ({
    url,
    method = "GET",
    token = "",
    headers = {},
    data = null,
    isFormData = false,
  }) => {
    setLoading(true);
    setError(null);

    try {
      token = token || localStorage.getItem("token") || sessionStorage.getItem("token") || "";

      if (typeof token !== "string") {
        console.warn("⚠️ Invalid token format:", typeof token, token);
        token = typeof token === "object" && token?.token ? token.token : "";
      }

      if (token) headers["Authorization"] = `Bearer ${token}`;
      if (!isFormData && method !== "GET") headers["Content-Type"] = "application/json";

      const options = {
        method,
        headers,
        ...(method !== "GET" && data
          ? { body: isFormData ? data : JSON.stringify(data) }
          : {}),
      };

      console.log("📡 Sending HTTP request:", buildUrl(url), options);
      const response = await fetch(buildUrl(url), options);
      const resData = await handleResponse(response);

      if (resData && !resData.success) {
        const message = resData.data?.message?.includes("phone")
          ? "Invalid phone number!!"
          : resData.data?.message || "Please fill out the form accurately.";
        showErrorPopup?.(message);
      }

      return resData;
    } catch (err) {
      showErrorPopup?.(err.message || "An unexpected error occurred");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    getReq: (url, options = {}) => request({ url, method: "GET", ...options }),
    postReq: (url, options = {}) => request({ url, method: "POST", ...options }),
    loading,
    error,
    setError,
  };
};

// ErrorPopup context provider
export const ErrorPopupProvider = ({ children }) => {
  const [popupMessage, setPopupMessage] = useState(null);

  const showErrorPopup = (message) => {
    setPopupMessage(message);
  };

  const closePopup = () => {
    setPopupMessage(null);
  };

  return (
    <ErrorHandleContext.Provider value={{ showErrorPopup }}>
      {children}
      {popupMessage && (
        <ErrorPopup takeData={popupMessage} setPopupShow={closePopup} />
      )}
    </ErrorHandleContext.Provider>
  );
};
