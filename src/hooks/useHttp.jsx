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

  // const mainURL = "http://192.168.1.171:5000"; // Make sure this does not end with a slash
  const mainURL = "http://192.168.1.60:5000"; //Rahul's backend

  // Normalize URL to avoid "//" issues
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
      return await response.json();
    } catch {
      showErrorPopup("Invalid response format from server.");
      return null;
    }
  };

  const getReq = async (url, token = "") => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(buildUrl(url), {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      return await handleResponse(response);
    } catch (err) {
      showErrorPopup(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const postReq = async (url, token = "", data, isFormData = false) => {
    setLoading(true);
    setError(null);
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      if (!isFormData) {
        headers["Content-Type"] = "application/json";
      }

      const response = await fetch(buildUrl(url), {
        method: "POST",
        headers: headers,
        body: isFormData ? data : JSON.stringify(data),
      });

      const resData = await handleResponse(response);

      if (resData && !resData.success) {
        const message =
          resData?.message ===
          "Moderator validation failed: phone: Please enter a valid phone number"
            ? "Invalid phone number!!"
            : resData?.message || "Please fill out the form accurately.";
        showErrorPopup(message);
      }

      return resData;
    } catch (err) {
      showErrorPopup(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

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
