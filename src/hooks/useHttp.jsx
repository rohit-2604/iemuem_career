import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorPopup } from "../utils/ErrorPopup";

// Error Context
const ErrorHandleContext = createContext();
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
        success: json.success ?? true, // assume success if not explicitly false
        message: json.message,
        data: json, // normalize: everything goes under `data`
      };
    } catch {
      showErrorPopup("Invalid response format from server.");
      return null;
    }
  };

  const request = async ({ url, method = "GET", token = "", data = null, isFormData = false }) => {
    setLoading(true);
    setError(null);

    try {
      const headers = {};
      if (token) headers["Authorization"] = `Bearer ${token}`;
      if (!isFormData && method !== "GET") headers["Content-Type"] = "application/json";

      const options = {
        method,
        headers,
      };

      if (method !== "GET" && data) {
        options.body = isFormData ? data : JSON.stringify(data);
      }

      const response = await fetch(buildUrl(url), options);
      const resData = await handleResponse(response);

      if (resData && !resData.success) {
        const message =
          resData.data?.message ===
          "Moderator validation failed: phone: Please enter a valid phone number"
            ? "Invalid phone number!!"
            : resData.data?.message || "Please fill out the form accurately.";
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

  const getReq = (url, token = "") => request({ url, method: "GET", token });
  const postReq = (url, token = "", data = {}, isFormData = false) =>
    request({ url, method: "POST", token, data, isFormData });

  return { getReq, postReq, loading, error, setError };
};

// ErrorPopup Provider
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
