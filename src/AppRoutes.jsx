import React from "react";
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Import only what is required for now
import SupAdminSignIn from "./pages/Auth/SuperAdminLogin";

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to="/superadmin/login" replace />}
      />
      {/* Only the SuperAdmin login route is enabled */}
      <Route path="/superadmin/login" element={<SupAdminSignIn />} />

      {/* Redirect all other unknown routes to the login */}
        <Route path="*" element={<Navigate to="/superadmin/login" />} />
    </Routes>
  );
}

export default AppRoutes;
