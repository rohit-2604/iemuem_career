import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/superadmin/iem_logo.png";

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
} from "lucide-react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div
      className={`${
        isOpen ? "w-[220px]" : "w-[72px]"
      } bg-black text-white flex flex-col h-screen sticky top-0 transition-all duration-300`}
    >
      {/* Header with Hamburger */}

<div className="relative p-4">
  {isOpen && (
    <div className="w-40 h-14 mb-4 mx-auto flex items-center justify-center">
      <img
        src={logo}
        alt="IEM Logo"
        className="object-contain"
      />
    </div>
  )}
  <button
    onClick={toggleSidebar}
    className={`text-white absolute top-4 ${isOpen ? "right-2" : "left-1/2 -translate-x-1/2"}`}
  >
    {isOpen ? <X size={20} /> : <Menu size={20} />}
  </button>
</div>






      {/* Navigation */}
      <nav className="flex-1 px-2 space-y-1 mt-4">

        {navLink("/superadmin/dashboard", LayoutGrid, "Dashboard", isOpen, true)}
        {navLink("#", Building2, "Departments", isOpen)}
        {navLink("#", FileText, "Forms", isOpen)}
        {navLink("#", Bell, "Notifications", isOpen)}
        {navLink("#", Settings, "Settings", isOpen)}
      </nav>

      {/* Help Section */}
      <div className={`px-2 pt-3 ${isOpen ? "border-t border-gray-800" : ""}`}>
  {isOpen && (
    <h3 className="text-xs text-gray-400 mb-2 px-2">Help and Support</h3>
  )}
  {navLink("#", HelpCircle, "Support", isOpen)}
  {navLink("#", Shield, "Privacy Policy", isOpen)}
  {navLink("#", ThumbsUp, "Feedback", isOpen)}
</div>


      {/* Logout */}
      <div className="p-2">
        <button className="w-full flex items-center justify-center gap-2 bg-gray-800 text-white border border-gray-700 rounded-md py-2 hover:bg-gray-700">
          <LogOut className="h-4 w-4" />
          {isOpen && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
}

// Helper function for nav links
function navLink(to, Icon, label, isOpen, active = false) {
  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-3 py-2 rounded-md transition-all ${
        active
          ? "bg-blue-600 text-white"
          : "text-gray-300 hover:bg-gray-800"
      } ${!isOpen ? "justify-center" : ""}`}
    >
      <Icon className="h-5 w-5" />
      {isOpen && <span>{label}</span>}
    </Link>
  );
}
