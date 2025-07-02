import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Layout
import Layout from "./layouts/Layouts";

// Auth pages
import SupAdminSignIn from "./pages/SuperAdmin/SuperAdminLogin";
// import ModeratorLogin from "./pages/Auth/ModeratorLogin";
import UserLogin from "./pages/User/userLogin";
import UserRegister from "./pages/User/userRegister";
import ResetPassword from "./pages/User/resetPassword";

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

// Login context
import { useLogin } from "./contexts/SuperAdmin/LoginContext";  // Import useLogin hook
import Applications from "./pages/User/Applications";
import Profile from "./pages/User/Profile";

function AppRoutes() {
  const { isLogin, userRole } = useLogin(); 

  return (
    <Routes>
      {/* Default route */}
      <Route path="/" element={<Navigate to="/superadmin/login" replace />} />

      {/* Auth routes */}
      <Route path="/superadmin/login" element={<SupAdminSignIn />} />
      <Route path="/user/login" element={<UserLogin />} />
      <Route path="/user/register" element={<UserRegister />} />
      <Route path="/user/resetpassword" element={<ResetPassword />} />

      {/* SuperAdmin routes */}
      <Route path="/superadmin" element={isLogin && userRole === "superadmin" ? <Layout /> : <Navigate to="/superadmin/login" replace />}>
        <Route path="dashboard" element={<SuperAdminDashboard />} />
        <Route path="departments" element={userRole === "superadmin" ? <Departments /> : <Navigate to="/superadmin/login" replace />} />
        <Route path="forms" element={userRole === "superadmin" ? <SuperAdminForms /> : <Navigate to="/superadmin/login" replace />} />
        <Route path="forms/create-job" element={userRole === "superadmin" ? <CreateJobForm /> : <Navigate to="/superadmin/login" replace />} />
        <Route path="dept_admin" element={userRole === "superadmin" ? <DepartmentAdminDashboard /> : <Navigate to="/superadmin/login" replace />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="settings" element={<Settings />} />
        <Route path="support" element={<Support />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="feedback" element={<Feedback />} />
      </Route>

      {/* Moderator routes */}
      <Route path="/moderator" element={isLogin && userRole === "moderator" ? <Layout /> : <Navigate to="/moderator/login" replace />}>
        <Route path="dashboard" element={<ModeratorDashboard />} />
      </Route>

      {/* User routes */}
      <Route path="/user" element={isLogin && userRole === "user" ? <Layout /> : <Navigate to="/user/login" replace />}>
      <Route path="applications" element={userRole === "user" ? <Applications /> : <Navigate to="/user/login" replace />} />
      <Route path="profile" element={userRole === "user" ? <Profile /> : <Navigate to="/user/login" replace />} />
        <Route path="dashboard" element={<UserDashboard />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="settings" element={<Settings />} />
        <Route path="support" element={<Support />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="feedback" element={<Feedback />} />
      </Route>

      {/* Catch-all route */}
      <Route path="*" element={<Navigate to="/superadmin/login" replace />} />
    </Routes>
  );
}

export default AppRoutes;
