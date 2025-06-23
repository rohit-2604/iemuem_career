import { SearchIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function SearchBar({ onSearch }) {
  
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (onSearch) {
      onSearch(searchQuery); // 🔍 Trigger search automatically on input change
    }
  }, [searchQuery]);

  return (
    <div className="relative flex flex-1 items-center inter">
      <input
        type="search"
        placeholder="Search here"
        className="w-full pr-8 p-2 border border-gray-300 rounded-xl bg-white shadow-sm flex-1"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
        <SearchIcon size={20} />
      </span>
    </div>
  );
}
