import { ChevronRight, Plus } from "lucide-react"
import CreateButton from "../../common/CreateButton"

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
        <CreateButton label="Create New Form" url="/superadmin/forms"/>
      </div>
    </div>
  )
}
