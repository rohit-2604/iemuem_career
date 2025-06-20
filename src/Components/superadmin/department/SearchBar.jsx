import { SearchIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function SearchBar({ onSearch }) {
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (onSearch) {
      onSearch(search); // 🔍 Trigger search automatically on input change
    }
  }, [search]);

  return (
    <div className="relative min-w-full">
      <input
        type="text"
        placeholder="Search here ..."
        className="w-full pl-4 bg-white py-2 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#adadad]"
        value={search}
        onChange={(e) => setSearch(e.target.value)} 
      />
      <button
        type="button"
        className="absolute right-3 top-1/2 -translate-y-1/2 transform"
        onClick={() => onSearch(search)} 
      >
        <SearchIcon className="h-5 w-5 text-gray-400" />
      </button>
    </div>
  );
}
