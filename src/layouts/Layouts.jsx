import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../Components/common/Sidebar"; // use a generic Sidebar for all roles

export default function Layout() {
  const location = useLocation();

  // Determine role from either localStorage or URL path
  const path = location.pathname;
  const inferredRole = path.startsWith("/superadmin")
    ? "superadmin"
    : path.startsWith("/moderator")
    ? "moderator"
    : path.startsWith("/user")
    ? "user"
    : "guest";

  const finalRole = localStorage.getItem("role") || inferredRole;

  return (
    <div className="flex min-h-screen">
      <Sidebar role={finalRole} />
      <main className="flex-1 overflow-y-auto ">
        
        <Outlet />
      </main>
    </div>
  );
}
