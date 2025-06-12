import { ChevronRight, Plus } from "lucide-react"

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
        <div className="grid grid-cols-2 gap-2">
          <div>
            <p className="text-sm text-gray-500">Total active:</p>
            <p className="text-lg font-medium">15</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Number of admins:</p>
            <p className="text-lg font-medium">11</p>
          </div>
        </div>

        <button className="w-full flex items-center justify-center gap-2 bg-[#367aff] text-white py-2 px-4 rounded-md hover:bg-blue-700">
          <Plus className="h-6 w-6 bg-white text-[#367aff] rounded " />
          
          <span>Create New Department</span>
        </button>
      </div>
    </div>
  )
}
