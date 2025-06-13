import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Layout
import Layout from "./layouts/Layouts";

// Auth pages
import SupAdminSignIn from "./pages/Auth/SuperAdminLogin";
// import ModeratorLogin from "./pages/Auth/ModeratorLogin";
// import UserLogin from "./pages/Auth/UserLogin";

// SuperAdmin pages
import SuperAdminDashboard from "./pages/SuperAdmin/Dashboard";
import SuperAdminForms from "./pages/SuperAdmin/Forms";

// Moderator pages
import ModeratorDashboard from "./pages/Admin/Dashboard";

// User pages
import UserDashboard from "./pages/User/Dashboard";

function AppRoutes() {
  return (
    <Routes>
      {/* Default route */}
      <Route path="/" element={<Navigate to="/superadmin/login" replace />} />

      {/* Auth routes */}
      <Route path="/superadmin/login" element={<SupAdminSignIn />} />
      {/* <Route path="/moderator/login" element={<ModeratorLogin />} /> */}
      {/* <Route path="/user/login" element={<UserLogin />} /> */}

      {/* SuperAdmin routes */}
      <Route path="/superadmin" element={<Layout />}>
        <Route path="dashboard" element={<SuperAdminDashboard />} />
        <Route path="forms" element={<SuperAdminForms />} />
      </Route>

      {/* Moderator routes */}
      <Route path="/moderator" element={<Layout />}>
        <Route path="dashboard" element={<ModeratorDashboard />} />
      </Route>

      {/* User routes */}
      <Route path="/user" element={<Layout />}>
        <Route path="dashboard" element={<UserDashboard />} />
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/superadmin/login" replace />} />
    </Routes>
  );
}

export default AppRoutes;
