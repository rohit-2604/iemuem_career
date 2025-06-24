import { ChevronRight, Plus } from "lucide-react";
import CreateButton from "../../common/CreateButton";

export default function DepartmentSection() {
  return (
    <div className="border border-gray-200 rounded-lg shadow-md bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-2 border-b border-gray-300">
        <h2 className="text-lg font-semibold text-gray-800">Department</h2>
        <button className="flex items-center text-sm font-medium text-[#7d7d7d] hover:text-blue-800 transition-colors">
          View More
          <ChevronRight className="h-4 w-4 ml-1" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        <div className="grid grid-rows-2">
          <div className="flex items-center justify-left gap-2">
            <p className="text-lg text-gray-500">Total active :</p>
            <p className="text-lg font-medium">15</p>
          </div>
          <div className="flex items-center justify-left gap-2">
            <p className="text-lg text-gray-500">Number of admins :</p>
            <p className="text-lg font-medium">11</p>
          </div>
        </div>
        <CreateButton label="Create New Department" url=""/>
      </div>
    </div>
  );
}
