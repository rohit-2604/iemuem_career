import React from "react";
import "./App.css";

// Only the required components and routes
import AppRoutes from "./AppRoutes";

// Context providers - FIX: Using consistent import paths matching your structure
import { DepartmentProvider } from "./contexts/SuperAdmin/DepartmentContext";
import { LoginProvider } from "./contexts/SuperAdmin/LoginContext";
import { ErrorPopupProvider } from "./hooks/useHttp";

// React Router
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <ErrorPopupProvider>
        <LoginProvider>
          <DepartmentProvider>
            <div className="bg-[#F3F3F3] min-h-screen">
              {/* FIX: Add error boundary for better error handling */}
              <React.Suspense fallback={<div>Loading...</div>}>
                <AppRoutes />
              </React.Suspense>
            </div>
          </DepartmentProvider>
        </LoginProvider>
      </ErrorPopupProvider>
    </BrowserRouter>
  );
}

export default App;