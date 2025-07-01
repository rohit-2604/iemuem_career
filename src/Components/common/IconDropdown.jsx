import React from "react";
import { ChevronDown } from "lucide-react"; // Lucide dropdown arrow

function IconDropdown({ icon: Icon, options = [], ...props }) {
  return (
    <div className="relative w-full">

      {Icon && (
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-500">
          <Icon className="w-5 h-5" />
        </div>
      )}

      <select
        className={`w-full appearance-none border border-gray-300 rounded-md shadow-sm text-md p-2 ${
          Icon ? "pl-10" : "pl-3"
        } pr-10 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {/* Lucide Chevron on the right */}
      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
        <ChevronDown className="w-5 h-5" />
      </div>
    </div>
  );
}

export default IconDropdown;
