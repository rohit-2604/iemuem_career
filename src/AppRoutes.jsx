import React from "react";
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Page components
import SupAdminSignIn from "./pages/Auth/SuperAdminLogin";
import SuperAdminDashboard from "./pages/SuperAdmin/Dashboard"; // 🔁 Import dashboard component

function AppRoutes() {
  return (
    <Routes>
      {/* Redirect root to login */}
      <Route
        path="/"
        element={<Navigate to="/superadmin/login" replace />}
      />

      {/* Super Admin routes */}
      <Route path="/superadmin/login" element={<SupAdminSignIn />} />
      <Route path="/superadmin/dashboard" element={<SuperAdminDashboard />} /> {/* 🔁 New route */}

      {/* Catch-all: redirect unknown paths to login */}
      <Route path="*" element={<Navigate to="/superadmin/login" />} />
    </Routes>
  );
}

export default AppRoutes;
