import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutGrid,
  Building2,
  FileText,
  Bell,
  Settings,
  HelpCircle,
  Shield,
  ThumbsUp,
  LogOut,
  Menu,
  Users,
  ShieldUser,
} from "lucide-react";

export default function Sidebar({ role = "guest" }) {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();

    document.cookie.split(";").forEach((cookie) => {
      const name = cookie.split("=")[0].trim();
      const domains = [
        "",
        window.location.hostname,
        `.${window.location.hostname.replace(/^www\./, "")}`,
      ];
      domains.forEach((domain) => {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${domain};`;
      });
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });

    window.location.href = `/${role}/login`;
  };

  const navItems = {
    superadmin: [
      { to: "/superadmin/dashboard", icon: LayoutGrid, label: "Dashboard" },
      { to: "/superadmin/departments", icon: Building2, label: "Departments" },
      { to: "/superadmin/dept_admin", icon: ShieldUser, label: "Dept. Admin" },
      { to: "/superadmin/forms", icon: FileText, label: "Forms" },
      { to: "/superadmin/notifications", icon: Bell, label: "Notifications" },
      { to: "/superadmin/settings", icon: Settings, label: "Settings" },
    ],
    moderator: [
      { to: "/moderator/dashboard", icon: LayoutGrid, label: "Dashboard" },
      { to: "/moderator/review", icon: FileText, label: "Review Forms" },
      { to: "/moderator/users", icon: Users, label: "User Management" },
      { to: "/moderator/settings", icon: Settings, label: "Settings" },
    ],
    user: [
      { to: "/user/dashboard", icon: LayoutGrid, label: "Dashboard" },
      { to: "/user/applications", icon: FileText, label: "Applications" },
      { to: "/user/profile", icon: Users, label: "Profile" },
    ],
  };

  const currentNav = navItems[role] || [];

  return (
    <div
      className={`relative ${
        isOpen ? "w-[220px]" : "w-[72px]"
      } bg-black text-white flex flex-col h-screen sticky top-0 transition-all duration-300`}
    >
      {/* Toggle Button */}
      <div
        className={`absolute top-4 ${
          isOpen ? "left-4" : "left-1/2 -translate-x-1/2"
        } z-20 transition-all duration-300`}
      >
        <button onClick={toggleSidebar} className="text-white">
          <Menu size={22} />
        </button>
      </div>

      {/* Logo */}
      <div className="pt-14 flex justify-center items-center">
        {isOpen && (
          <div className="w-40 h-14 flex items-center justify-center">
            <img
              src={"/iem_logo.png"}
              alt="IEM Logo"
              className="object-contain"
            />
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 space-y-1 mt-4">
        {currentNav.map(({ to, icon, label }) =>
          navLink(to, icon, label, isOpen, location.pathname)
        )}
      </nav>

      {/* Help Section */}
      <div className={`px-2 pt-3 ${isOpen ? "border-t border-gray-800" : ""}`}>
        {isOpen && (
          <h3 className="text-xs text-gray-400 mb-2 px-2">Help & Support</h3>
        )}
        {["/support", "/privacy", "/feedback"].map((path, index) => (
          <div key={index} className="relative group">
            {navLink(
              `/superadmin${path}`,
              index === 0 ? HelpCircle : index === 1 ? Shield : ThumbsUp,
              index === 0
                ? "Support"
                : index === 1
                ? "Privacy"
                : "Feedback",
              isOpen
            )}
          </div>
        ))}
      </div>

      {/* Logout Button */}
      <div className="p-2">
        <div className="relative group">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-gray-800 text-white border border-gray-700 rounded-md py-2 hover:bg-gray-700"
          >
            <LogOut className="h-4 w-4" />
            {isOpen && <span>Logout</span>}
          </button>
          {!isOpen && (
            <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 rounded bg-gray-900 text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow-lg">
              Logout
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// ✅ Updated navLink helper
function navLink(to, Icon, label, isOpen, currentPath = "") {
  const isActive = currentPath === to || currentPath.startsWith(to + "/");

  return (
    <div key={to} className="relative group">
      <Link
        to={to}
        className={`flex items-center gap-3 px-3 py-2 rounded-md transition-all relative
          ${
            isActive
              ? "bg-blue-600 text-white before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-white before:rounded-r"
              : "text-gray-300 hover:bg-gray-800"
          }
          ${!isOpen ? "justify-center" : ""}
        `}
      >
        <Icon className="h-5 w-5" />
        {isOpen && <span>{label}</span>}
      </Link>
      {!isOpen && (
        <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 rounded bg-gray-900 text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow-lg">
          {label}
        </span>
      )}
    </div>
  );
}
