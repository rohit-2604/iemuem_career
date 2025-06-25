import { CardSim, ChevronDown } from "lucide-react"
import Filters from "../../common/Filters"

export default function HiringFormDetails() {


  return (
    <div className=" rounded-lg shadow-md bg-white">
      {/* Header */}
      <div className="flex flex-row items-center justify-between p-4 ">
        <div className="flex items-center gap-2 text-lg font-medium">
          <CardSim />
          Hiring Form Details
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        <div className="flex flex-wrap gap-5 justify-end">
        {/* Filters */}
            <Filters />
              <button className=" bg-black text-white text-lg rounded-md px-4 py-2 hover:bg-gray-800">
                Check
              </button>
        </div>

        {/* Table */}
        <div className="overflow-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#eaeaea]">
                <th className="text-left py-3 px-2 text-sm text-[#656575] font-medium">Department</th>
                <th className="text-left py-3 px-2 text-sm text-[#656575]  font-medium">Date</th>
                <th className="text-left py-3 px-2 text-sm text-[#656575]  font-medium">Status</th>
                <th className="text-left py-3 px-2 text-sm text-[#656575]  font-medium">Total Applicants</th>
                <th className="text-left py-3 px-2 text-sm font-medium"></th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#eaeaea] text-[#656575] ">
                <td className="py-3 px-2">CSE</td>
                <td className="py-3 px-2">May 2025 - Jun 2025</td>
                <td className="py-3 px-2">
                  <div className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2 shadow-[0_0_6px_2px_rgba(34,197,94,0.7)]" />
                    Live
                  </div>
                </td>
                <td className="py-3 px-2">25</td>
                <td className="py-3 px-2">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded-md">
                    Details
                  </button>
                </td>
              </tr>
              <tr className="text-[#656575] ">
                <td className="py-3 px-2">CSE</td>
                <td className="py-3 px-2">Mar 2024 - Oct 2024</td>
                <td className="py-3 px-2">
                  <div className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-red-500 mr-2 shadow-[0_0_6px_2px_rgba(239,68,68,0.7)]" />
                    Closed
                  </div>
                </td>
                <td className="py-3 px-2">39</td>
                <td className="py-3 px-2">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded-md">
                    Details
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
