import { FiEdit3 } from "react-icons/fi";

export default function DepartmentCard({ name, description, departmentCode, onChangeClick }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow border border-gray-200 relative flex flex-col">
      {/* Header */}
      <div className="bg-blue-500 text-white text-center py-6 px-4">
        <h2 className="text-xl font-bold truncate">{name || "Unnamed Department"}</h2>
      </div>

      {/* Content */}
      <div className="relative p-4 flex-1 flex flex-col justify-between">
        {/* Edit Button */}
        <button
          onClick={onChangeClick}
          className="absolute top-3 right-3 z-10 flex items-center gap-1 bg-black text-white text-xs px-2 py-1 rounded hover:bg-black/70 transition"
        >
          <FiEdit3 className="text-sm" />
          Change
        </button>

        {/* Description */}
        <p className="text-sm text-gray-700 mb-4">
          <span className="font-semibold">Description:</span>{" "}
          {description?.trim() ? description : "No description"}
        </p>

        {/* Department Code */}
        <p className="text-sm text-gray-700 mb-4">
          <span className="font-semibold">Department Code:</span>{" "}
          {departmentCode?.trim() ? departmentCode : "N/A"}
        </p>

        {/* View Details Button */}
        <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors mt-auto">
          View Details
        </button>
      </div>
    </div>
  );
}
