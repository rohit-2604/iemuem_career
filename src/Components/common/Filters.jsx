import { SlidersHorizontal, Building, BookCheck } from "lucide-react";

function Filters() {
  return (
    <div className="flex items-center space-x-4 text-gray-700 bg-gray-100 rounded-md">
      {/* Filter label with icon */}
      <div className="flex items-center space-x-2">
        <SlidersHorizontal className="w-6 h-6" />
        <span className="text-lg font-medium">Filter</span>
      </div>

      {/* Department dropdown */}
      <div className="flex items-center space-x-2 border border-gray-300 bg-white px-3 py-1.5 rounded-md shadow-sm text-sm">
        <Building className="w-8 h-8 text-gray-500" />
        <select className="bg-white focus:outline-none text-lg p-2">
          <option value="">Department</option>
          <option value="CSE">CSE</option>
          <option value="ECE">ECE</option>
          <option value="EEE">EEE</option>
          <option value="EE">EE</option>
          <option value="ME">ME</option>
          <option value="AIML">AIML</option>
          <option value="CSBS">CSBS</option>
          <option value="BCA">BCA</option>
          <option value="MCA">MCA</option>
          <option value="IOT(CSBT)">IOT(CSBT)</option>
          <option value="CSE(AI)">CSE(AI)</option>
        </select>
      </div>

      {/* Form Status dropdown */}
      <div className="flex items-center space-x-2 border border-gray-300 bg-white px-3 py-1.5 rounded-md shadow-sm text-sm">
        <BookCheck className="w-8 h-8 text-gray-500" />
        <select className="bg-white focus:outline-none text-lg p-2">
          <option value="">Form Status</option>
          <option value="live">Live</option>
          <option value="closed">Closed</option>
          <option value="pending">Pending</option>
        </select>
      </div>
    </div>
  );
}

export default Filters;