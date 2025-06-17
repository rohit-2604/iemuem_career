import { FiEdit3 } from "react-icons/fi";

export default function DepartmentCard({ name, description, onChangeClick }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 relative">
      {/* Header */}
      <div className="bg-blue-500 text-white text-center py-6 relative">
        <h2 className="text-xl font-bold">{name}</h2>
      </div>

      {/* Description */}
      <div className="p-4 relative">
        <button
          onClick={onChangeClick}
          className="absolute top-2 right-2 z-10 flex items-center gap-1 bg-black text-white text-xs px-2 py-1 rounded-md hover:bg-black/60"
        >
          <FiEdit3 className="text-sm" />
          Change
        </button>

        <p className="text-sm text-gray-700 mb-4">
          <span className="font-medium">Description:</span>{" "}
          {description || "No description"}
        </p>

        <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors">
          View Details
        </button>
      </div>
    </div>
  );
}
