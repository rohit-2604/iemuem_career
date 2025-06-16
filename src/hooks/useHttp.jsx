import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorPopup } from "../utils/ErrorPopup";

// Create Context for error handling
const ErrorHandleContext = createContext();

// Custom hook to use the error handler
export const useErrorHandle = () => useContext(ErrorHandleContext);

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { showErrorPopup } = useErrorHandle();
  const navigate = useNavigate();

  const mainURL = "http://localhost:5000";

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

      showErrorPopup(errorMessage);
      localStorage.clear();
      navigate("/superadmin/login");
      return null;
    }

    try {
      const json = await response.json();
      return {
        success: json.success ?? true,
        message: json.message,
        data: json,
      };
    } catch {
      showErrorPopup("Invalid response format from server.");
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
      // Fallback to token from localStorage or sessionStorage
      if (!token) {
        token = localStorage.getItem("token") || sessionStorage.getItem("token") || "";
      }

      if (typeof token !== "string") {
        console.warn("⚠️ Invalid token type. Expected string but got:", typeof token, token);
        token = token?.token || "";
      }

      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      if (!isFormData && method !== "GET") {
        headers["Content-Type"] = "application/json";
      }

      const options = {
        method,
        headers,
      };

      if (method !== "GET" && data) {
        options.body = isFormData ? data : JSON.stringify(data);
      }

      console.log("📡 Sending HTTP request:", {
        url: buildUrl(url),
        ...options,
      });

      const response = await fetch(buildUrl(url), options);
      const resData = await handleResponse(response);

      if (resData && !resData.success) {
        const msg = resData.data?.message;
        const message =
          msg ===
          "Moderator validation failed: phone: Please enter a valid phone number"
            ? "Invalid phone number!!"
            : msg || "Please fill out the form accurately.";
        showErrorPopup(message);
      }

      return resData;
    } catch (err) {
      showErrorPopup(err.message || "An unexpected error occurred");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // ✅ Updated to support flexible options object
  const getReq = (url, options = {}) =>
    request({ url, method: "GET", ...options });

  const postReq = (url, options = {}) =>
    request({ url, method: "POST", ...options });

  return { getReq, postReq, loading, error, setError };
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
