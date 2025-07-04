import { ChevronRight, Plus } from "lucide-react"
import CreateButton from "../../common/CreateButton"

export default function RecruitmentFormsSection() {
  return (
    <div className=" rounded-lg shadow-sm bg-white p-4">
      <div className="flex flex-row items-center justify-between border-gray-300 pb-2">
        <h2 className="text-lg font-medium">Recruitment Forms</h2>
        {/* <button className="flex items-center text-sm font-medium text-[#7d7d7d] hover:text-blue-800 transition-colors">
          View More
          <ChevronRight className="h-4 w-4 ml-1" />
        </button> */}
      </div>
      <div className="space-y-4">
        <div className="grid grid-rows-2 p-1 gap-1">
          <div className="flex items-center justify-left gap-2">
            <p className="text-md text-gray-500">Open Forms:</p>
            <p className="text-md font-medium">0</p>
          </div>
          <div className="flex items-center justify-left gap-2">
            <p className="text-md text-gray-500">Closed Forms:</p>
            <p className="text-md font-medium">0</p>
          </div>
        </div>
        <CreateButton label="View Forms" url="/superadmin/forms"/>
      </div>
    </div>
  )
}
