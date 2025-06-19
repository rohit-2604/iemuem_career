import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { useNavigate } from "react-router-dom";
import { ErrorPopup } from "../utils/ErrorPopup";

const ErrorHandleContext = createContext();

export const useErrorHandle = () => {
  const context = useContext(ErrorHandleContext);
  if (!context) {
    console.warn("useErrorHandle must be used within ErrorPopupProvider");
  }
  return context;
};

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigateRef = useRef(null); // To use navigate safely
  const { showErrorPopup } = useErrorHandle() || {};

  // Save navigate once it's available
  const navigate = useNavigate();
  useEffect(() => {
    navigateRef.current = navigate;
  }, [navigate]);

  const mainURL =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  const buildUrl = (path) => {
    const trimmedPath = path.startsWith("/") ? path.slice(1) : path;
    return `${mainURL}/${trimmedPath}`;
  };

  const handleResponse = async (response) => {
    if ([401, 403].includes(response.status)) {
      let errorMessage = "Unauthorized access";
      try {
        const errorJson = await response.json();
        errorMessage = errorJson.message || errorMessage;
      } catch {
        // fallback to default error message
      }

      showErrorPopup?.(errorMessage);

      localStorage.clear();
      sessionStorage.clear();
      if (navigateRef.current) {
        navigateRef.current("/superadmin/login");
      }
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
      token =
        token ||
        localStorage.getItem("token") ||
        sessionStorage.getItem("token") ||
        "";

      if (typeof token === "string" && token.trim() !== "") {
        headers["Authorization"] = `Bearer ${token}`;
      }

      if (!isFormData && method !== "GET") {
        headers["Content-Type"] = "application/json";
      }

      const options = {
        method,
        headers,
        ...(method !== "GET" && data
          ? { body: isFormData ? data : JSON.stringify(data) }
          : {}),
      };

      console.log("📡 Sending request:", buildUrl(url), options);

      const response = await fetch(buildUrl(url), options);
      const resData = await handleResponse(response);

      if (resData && !resData.success) {
        const msg =
          resData.data?.message?.includes("phone")
            ? "Invalid phone number!!"
            : resData.message || "An error occurred.";
        showErrorPopup?.(msg);
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
    postReq: (url, data, token = "", headers = {}) =>
      request({ url, method: "POST", data, token, headers }),
    loading,
    error,
    setError,
  };
};

export const ErrorPopupProvider = ({ children }) => {
  const [popupMessage, setPopupMessage] = useState(null);

  const showErrorPopup = useCallback((message) => {
    setPopupMessage(message);
  }, []);

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
