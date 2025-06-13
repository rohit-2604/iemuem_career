import { ChevronRight, Plus } from "lucide-react"

export default function RecruitmentFormsSection() {
  return (
    <div className=" rounded-lg shadow-sm bg-white">
      <div className="flex flex-row items-center justify-between border-b p-2 border-gray-300">
        <h2 className="text-lg font-medium">Recruitment Forms</h2>
        <button className="flex items-center text-sm font-medium text-[#7d7d7d] hover:text-blue-800 transition-colors">
          View More
          <ChevronRight className="h-4 w-4 ml-1" />
        </button>
      </div>
      <div className="p-4 space-y-4">
        <div className="grid grid-rows-2">
          <div className="flex items-center justify-left gap-2">
            <p className="text-lg text-gray-500">Open Forms:</p>
            <p className="text-lg font-medium">5</p>
          </div>
          <div className="flex items-center justify-left gap-2">
            <p className="text-lg text-gray-500">Closed Forms:</p>
            <p className="text-lg font-medium">12</p>
          </div>
        </div>
        <button className="w-full flex bg-[#367aff] text-white py-1 pr-4 pl-1 rounded-xl hover:bg-blue-700 transition-colors">
          <Plus className="h-9 w-9 bg-white text-[#367aff] rounded-lg" />
          <div className="flex items-center ml-[15%]">Create New Form</div>
        </button>
      </div>
    </div>
  )
}
