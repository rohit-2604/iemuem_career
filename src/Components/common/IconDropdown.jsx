import React from "react";

function IconDropdown({ icon: Icon, options = [], ...props }) {
  return (
    <div className="flex items-center border border-gray-300 bg-white px-2 py-1 rounded-md shadow-sm text-md">
      {Icon && <Icon className="w-5 h-5 text-gray-500" />}
      <select className="bg-white focus:outline-none text-md p-2" {...props}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default IconDropdown; 