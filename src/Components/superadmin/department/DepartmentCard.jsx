import { FiEdit3 } from "react-icons/fi";

export default function DepartmentCard({ name, admin, activeForms, image }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
      <div className="relative w-full h-24">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h2 className="text-white text-lg font-bold">{name}</h2>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-gray-700">
            <span className="font-medium">Admin:</span> {admin}
          </p>
          <button className="flex items-center gap-1 bg-black text-white text-xs px-2 py-1 rounded-md">
            <FiEdit3 /> 
             Change
          </button>
        </div>
        <p className="text-sm text-gray-700 mb-4">
          <span className="font-medium">Active Forms:</span> {activeForms}
        </p>
        <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors">
          View Details
        </button>
      </div>
    </div>
  );
}
