// src/hooks/useHttp.js
// This is a recommended enhancement for your useHttp hook to prevent parsing errors

import { createContext, useContext, useState } from 'react';

const ErrorPopupContext = createContext();

export const ErrorPopupProvider = ({ children }) => {
  const [error, setError] = useState(null);

  return (
    <ErrorPopupContext.Provider value={{ error, setError }}>
      {children}
      {error && (
        <div className="fixed top-4 right-4 bg-red-500 text-white p-4 rounded shadow-lg z-50">
          <p>{error}</p>
          <button 
            onClick={() => setError(null)}
            className="ml-2 text-white hover:text-gray-200"
          >
            ×
          </button>
        </div>
      )}
    </ErrorPopupContext.Provider>
  );
};

export const useHttp = () => {
  const { setError } = useContext(ErrorPopupContext) || {};

  const postReq = async (endpoint, token = null, body = null) => {
    try {
      // Validate endpoint
      if (!endpoint) {
        throw new Error('API endpoint is required');
      }

      // Construct full URL
      const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000/';
      const url = `${baseURL}${endpoint}`;

      // Prepare headers
      const headers = {
        'Content-Type': 'application/json',
      };

      // Add authorization header if token is provided
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      // Prepare request options
      const options = {
        method: 'POST',
        headers,
      };

      // Add body if provided
      if (body) {
        options.body = JSON.stringify(body);
      }

      console.log('Making request to:', url);

      const response = await fetch(url, options);

      // Check if response is ok
      if (!response.ok) {
        const errorText = await response.text();
        console.error('HTTP Error:', response.status, errorText);
        
        let errorMessage;
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.message || `HTTP Error: ${response.status}`;
        } catch {
          errorMessage = `HTTP Error: ${response.status} - ${response.statusText}`;
        }
        
        throw new Error(errorMessage);
      }

      // Get response text first
      const responseText = await response.text();
      
      // Check if response is empty
      if (!responseText) {
        console.warn('Empty response received');
        return { success: false, message: 'Empty response from server' };
      }

      // Try to parse JSON
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error('JSON Parse Error:', parseError);
        console.error('Response text:', responseText);
        
        const errorMsg = 'Failed to parse server response. Server may have returned invalid JSON.';
        if (setError) setError(errorMsg);
        
        throw new Error(errorMsg);
      }

      return data;

    } catch (error) {
      console.error('Request failed:', error);
      
      // Show error popup if context is available
      if (setError) {
        setError(error.message);
      }

      // Return error object instead of throwing
      return {
        success: false,
        message: error.message,
        error: true
      };
    }
  };

  const getReq = async (endpoint, token = null) => {
    try {
      if (!endpoint) {
        throw new Error('API endpoint is required');
      }

      const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000/';
      const url = `${baseURL}${endpoint}`;

      const headers = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(url, {
        method: 'GET',
        headers,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('HTTP Error:', response.status, errorText);
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const responseText = await response.text();
      
      if (!responseText) {
        return { success: false, message: 'Empty response from server' };
      }

      const data = JSON.parse(responseText);
      return data;

    } catch (error) {
      console.error('GET request failed:', error);
      if (setError) setError(error.message);
      return { success: false, message: error.message, error: true };
    }
  };

  return { postReq, getReq };
};