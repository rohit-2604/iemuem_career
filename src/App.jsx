import React from "react";
import "./App.css";

// Context providers
import { LoginProvider } from "./contexts/SuperAdmin/LoginContext";
import { ErrorPopupProvider } from "./hooks/useHttp";

// React Router
import { BrowserRouter } from "react-router-dom";

// Lazy load AppRoutes
const AppRoutes = React.lazy(() => import("./AppRoutes"));

// Error boundary
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Error caught in error boundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong. Please try again later.</div>;
    }
    return this.props.children;
  }
}

function App() {
  return (
    <BrowserRouter>
      <ErrorPopupProvider>
        <LoginProvider>
          <div className="bg-[#F3F3F3] min-h-screen">
            <ErrorBoundary>
              <React.Suspense fallback={<div>Loading...</div>}>
                <AppRoutes />
              </React.Suspense>
            </ErrorBoundary>
          </div>
        </LoginProvider>
      </ErrorPopupProvider>
    </BrowserRouter>
  );
}

export default App;
