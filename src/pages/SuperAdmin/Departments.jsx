// import React from 'react'

// function Departments() {
//   return (
//     <div>
//         <h1 className="text-2xl font-bold mb-4">Departments</h1>
//         <p className="text-gray-700">Manage your departments here.</p>
//         {/* Add department management components here */}
//         <div className="mt-6">
//             {/* Example content */}
//             <ul className="list-disc pl-5">
//             <li>Department 1</li>
//             <li>Department 2</li>
//             <li>Department 3</li>
//             </ul>
//         </div>
//     </div>
//   )
// }

// export default Departments

// import type React from "react";
// import DepartmentGrid from "@/components/department-grid";
// import SearchBar from "@/components/search-bar";

import { PlusIcon } from "lucide-react";
import React from "react";
import SearchBar from "../../Components/superadmin/department/SearchBar";
import DepartmentGrid from "../../Components/superadmin/department/DepartmentGrid";
// import SearchBar from "@/components/search-bar";

export default function DepartmentManagement() {
  return (
    <div className="min-h-screen bg-[#dddddd] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 min-w-full">
  <div className="flex-1">
    <SearchBar />
  </div>
  <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#367aff] text-white hover:bg-blue-600 transition-colors whitespace-nowrap">
    <PlusIcon className="h-5 w-5 text-[#367aff] bg-white rounded" />
    Create New Department
  </button>
</div>
<div className="mt-6">

        <DepartmentGrid />

</div>
      </div>
    </div>
  );
}



