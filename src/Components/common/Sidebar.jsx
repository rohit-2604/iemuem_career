import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/superadmin/iem_logo.png";
import Cookies from "js-cookie";
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
} from "lucide-react";

export default function Sidebar({ role = "guest" }) {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();

    document.cookie.split(";").forEach(cookie => {
      const name = cookie.split("=")[0].trim();
      const domains = [
        "",
        window.location.hostname,
        `.${window.location.hostname.replace(/^www\./, "")}`,
      ];
      domains.forEach(domain => {
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
  {/* Toggle Button with Conditional Position */}
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
  <div className=" pt-14 flex justify-center items-center">
    {isOpen && (
      <div className="w-40 h-14 flex items-center justify-center">
        <img src={logo} alt="IEM Logo" className="object-contain" />
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
        {navLink("#support", HelpCircle, "Support", isOpen)}
        {navLink("#privacy", Shield, "Privacy Policy", isOpen)}
        {navLink("#feedback", ThumbsUp, "Feedback", isOpen)}
      </div>

      {/* Logout Button */}
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

// Helper for Navigation Link
function navLink(to, Icon, label, isOpen, currentPath = "") {
  const isActive = currentPath === to;

  return (
    <Link
      key={to}
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
