import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Layout
import Layout from "./layouts/Layouts";

// Auth pages
import SupAdminSignIn from "./pages/SuperAdmin/SuperAdminLogin";
// import ModeratorLogin from "./pages/Auth/ModeratorLogin";
import UserLogin from "./pages/User/userLogin";
import UserRegister from "./pages/User/userRegister";
import ResetPassword from "./pages/User/resetPassword"

// SuperAdmin pages
import SuperAdminDashboard from "./pages/SuperAdmin/Dashboard";
import SuperAdminForms from "./pages/SuperAdmin/Forms";
import Support from "./Components/common/Support";
import Privacy from "./Components/common/Privacy";
import Feedback from "./Components/common/Feedback";

// Moderator pages
import ModeratorDashboard from "./pages/Admin/Dashboard";

// User pages
import UserDashboard from "./pages/User/Dashboard";
import Departments from "./pages/SuperAdmin/Departments";
import DepartmentAdminDashboard from "./pages/SuperAdmin/DepartAdminDashboard";
import CreateJobForm from "./Components/superadmin/forms/CreateJobForm";
import Notifications from "./Components/common/Notifications";
import Settings from "./Components/common/Settings";
import Applications from "./pages/User/Applications";
import Profile from "./pages/User/Profile";


function AppRoutes() {
  return (
    <Routes>
      {/* Default route */}
      <Route path="/" element={<Navigate to="/superadmin/login" replace />} />

      {/* Auth routes */}
      <Route path="/superadmin/login" element={<SupAdminSignIn />} />
      {/* <Route path="/moderator/login" element={<ModeratorLogin />} /> */}
      <Route path="/user/login" element={<UserLogin />} />
      <Route path="/user/register" element={<UserRegister />} />
      <Route path="/user/resetpassword" element={<ResetPassword />} />

      {/* SuperAdmin routes */}
      <Route path="/superadmin" element={<Layout />}>
        <Route path="dashboard" element={<SuperAdminDashboard />} />
        <Route path="departments" element={<Departments />} />
        <Route path="forms" element={<SuperAdminForms />} />
        <Route path="/superadmin/forms/create-job" element={<CreateJobForm />} />
        <Route path="dept_admin" element={<DepartmentAdminDashboard />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="settings" element={<Settings />} />
        <Route path="support" element={<Support />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="feedback" element={<Feedback />} />
      </Route>

      {/* Moderator routes */}
      <Route path="/moderator" element={<Layout />}>
        <Route path="dashboard" element={<ModeratorDashboard />} />
      </Route>

      {/* User routes */}
      <Route path="/user" element={<Layout />}>
        <Route path="dashboard" element={<UserDashboard />} />
        <Route path="applications" element={<Applications/>} />
        <Route path="profile" element={<Profile />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="settings" element={<Settings />} />
        <Route path="support" element={<Support />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="feedback" element={<Feedback />} />
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/user/login" replace />} />
    </Routes>
  );
}

export default AppRoutes;
