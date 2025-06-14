import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/superadmin/iem_logo.png";

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
  X,
  Users,
} from "lucide-react";

export default function Sidebar({ role = "guest" }) {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = `/${role}/login`;
  };

  const navItems = {
    superadmin: [
      { to: "/superadmin/dashboard", icon: LayoutGrid, label: "Dashboard" },
      { to: "/superadmin/departments", icon: Building2, label: "Departments" },
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
      // { to: "/user/settings", icon: Settings, label: "Settings" },
    ],
  };

  const currentNav = navItems[role] || [];

  return (
    <div
      className={`${
        isOpen ? "w-[220px]" : "w-[72px]"
      } bg-black text-white flex flex-col h-screen sticky top-0 transition-all duration-300`}
    >
      {/* Header with logo and toggle */}
      <div className="relative p-4">
        {isOpen && (
          <div className="w-40 h-14 mb-4 mx-auto flex items-center justify-center">
            <img src={logo} alt="IEM Logo" className="object-contain" />
          </div>
        )}
        <button
          onClick={toggleSidebar}
          className={`text-white absolute top-4 ${
            isOpen ? "right-2" : "left-1/2 -translate-x-1/2"
          }`}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Main navigation */}
      <nav className="flex-1 px-2 space-y-1 mt-4">
        {currentNav.map(({ to, icon, label }) =>
          navLink(to, icon, label, isOpen, location.pathname)
        )}
      </nav>

      {/* Help section */}
      <div className={`px-2 pt-3 ${isOpen ? "border-t border-gray-800" : ""}`}>
        {isOpen && (
          <h3 className="text-xs text-gray-400 mb-2 px-2">Help & Support</h3>
        )}
        {navLink("#", HelpCircle, "Support", isOpen)}
        {navLink("#", Shield, "Privacy Policy", isOpen)}
        {navLink("#", ThumbsUp, "Feedback", isOpen)}
      </div>

      {/* Logout */}
      <div className="p-2">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-gray-800 text-white border border-gray-700 rounded-md py-2 hover:bg-gray-700"
        >
          <LogOut className="h-4 w-4" />
          {isOpen && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
}

// Link helper
function navLink(to, Icon, label, isOpen, currentPath = "") {
  const isActive = currentPath === to;

  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-3 py-2 rounded-md transition-all ${
        isActive ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-800"
      } ${!isOpen ? "justify-center" : ""}`}
    >
      <Icon className="h-5 w-5" />
      {isOpen && <span>{label}</span>}
    </Link>
  );
}
