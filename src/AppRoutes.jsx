import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Auth
import SupAdminSignIn from "./pages/Auth/SuperAdminLogin";

// Super Admin pages
import SuperAdminDashboard from "./pages/SuperAdmin/Dashboard/Dashboard";
// import Departments from "./pages/SuperAdmin/Departments";
// import Forms from "./pages/SuperAdmin/Forms";
// import Notifications from "./pages/SuperAdmin/Notifications";
// import Settings from "./pages/SuperAdmin/Settings";

function AppRoutes() {
  return (
    <Routes>
      {/* Default redirect to login */}
      <Route path="/" element={<Navigate to="/superadmin/login" replace />} />

      {/* Auth route */}
      <Route path="/superadmin/login" element={<SupAdminSignIn />} />

      {/* Super Admin routes */}
      <Route path="/superadmin/dashboard" element={<SuperAdminDashboard />} />
      {/* <Route path="/superadmin/departments" element={<Departments />} />
      <Route path="/superadmin/forms" element={<Forms />} />
      <Route path="/superadmin/notifications" element={<Notifications />} />
      <Route path="/superadmin/settings" element={<Settings />} /> */}

      {/* Catch-all: unknown path -> login */}
      <Route path="*" element={<Navigate to="/superadmin/login" replace />} />
    </Routes>
  );
}

export default AppRoutes;
