import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorPopup } from "../utils/ErrorPopup";

// Error handling
const ErrorHandleContext = createContext();
export const useErrorHandle = () => useContext(ErrorHandleContext);

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { showErrorPopup } = useErrorHandle();
  const navigate = useNavigate();

  // const mainURL = "http://localhost:5000";
  // const mainURL = "http://192.168.1.176:5000";
  // const mainURL = "http://192.168.0.112:5000";
  const mainURL = "https://api.example.com"; // Replace with your actual API URL

  const handleResponse = async (response) => {
    if ([403, 401].includes(response.status)) {
      const errorText = await response.text();
      let errorMessage;
      
      try {
        // Try to parse as JSON to get a structured error message
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.message || `Error ${response.status}: ${response.statusText}`;
      } catch {
        // If parsing fails, use the raw text or a default message
        errorMessage = errorText || `Error ${response.status}: ${response.statusText}`;
      }
      
      showErrorPopup(errorMessage);
      localStorage.clear();
      navigate("/superadmin/login");
      return null;
    }
    return response.json();
  };

  const getReq = async (url, token = "") => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${mainURL}/${url}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      return await handleResponse(response);
    } catch (err) {
      showErrorPopup(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const postReq = async (url, token = "", data, isFormData = false) => {
    setLoading(true);
    setError(null);
    try {
      // Set up headers based on whether we're sending FormData or JSON
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      
      // Only add Content-Type for JSON requests
      // For FormData, let the browser set the appropriate Content-Type with boundary
      if (!isFormData) {
        headers["Content-Type"] = "application/json";
      }
      
      const response = await fetch(`${mainURL}/${url}`, {
        method: "POST",
        headers: headers,
        body: isFormData ? data : JSON.stringify(data),
      });
      
      const resData = await handleResponse(response);
      if (resData && !resData.success) {
        showErrorPopup(
          resData?.message ===
          "Moderator validation failed: phone: Please enter a valid phone number"
            ? "Invalid phone number!!"
            : resData?.message || "Please fill out the form accurately."
        );
      }
      return resData;
    } catch (err) {
      showErrorPopup(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { getReq, postReq, loading, error, setError };
};

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