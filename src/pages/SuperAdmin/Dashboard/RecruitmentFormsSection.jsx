import { ChevronRight, Plus } from "lucide-react"

export default function RecruitmentFormsSection() {
  return (
    <div className=" rounded-lg shadow-sm bg-white">
      <div className="flex flex-row items-center justify-between border-b p-2 border-gray-300">
        <h2 className="text-md font-medium">Recruitment Forms</h2>
        <button className="flex items-center text-sm font-medium text-[#7d7d7d] hover:text-blue-800 transition-colors">
          View More
          <ChevronRight className="h-4 w-4 ml-1" />
        </button>
      </div>
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <p className="text-sm text-gray-500">Open Forms:</p>
            <p className="text-lg font-medium">5</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Closed Forms:</p>
            <p className="text-lg font-medium">12</p>
          </div>
        </div>
        <button className="w-full flex items-center justify-center gap-2 bg-[#367aff] text-white py-2 px-4 rounded-md hover:bg-blue-700 ">
          <Plus className="h-6 w-6 bg-white text-[#367aff] rounded " />
          Create New Form
        </button>
      </div>
    </div>
  )
}
