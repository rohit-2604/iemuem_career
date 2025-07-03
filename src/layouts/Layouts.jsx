import { Outlet } from "react-router-dom";
import Sidebar from "../Components/common/Sidebar"; // Use a generic Sidebar for all roles

export default function Layout() {
  // Retrieve the role from localStorage
  const role = localStorage.getItem("role") || "guest"; // Fallback to "guest" if not found

  return (
    <div className="flex min-h-screen">
      {/* Pass the role from localStorage to Sidebar */}
      <Sidebar role={role} />
      <main className="flex-1 overflow-y-auto p-4">
        {/* Render the outlet for nested routes */}
        <Outlet />
      </main>
    </div>
  );
}
