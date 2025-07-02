import { Filter, SlidersHorizontal, Users } from "lucide-react"


export default function HiringStatusTable() {
  return (
    <div className=" rounded-lg shadow-sm bg-white">
      <div className="flex flex-row items-center justify-between  px-4 py-3">
        <div className="flex items-center gap-2 font-semibold text-lg">
          <Users />
          Hiring Status
        </div>
        <button className="flex items-center gap-1 text-[#515156] px-2 py-1 text-sm rounded hover:bg-gray-100">
          <SlidersHorizontal className="h-4 w-4 text-[#515156]" />
          Filter
        </button>
      </div>
      <div className="overflow-auto px-4 py-2">
        <table className="w-full">
          <thead className="border-b border-[#eaeaea]">
            <tr className=" text-left text-sm font-medium">
              <th className="py-3 px-2 text-[#656575]">No.</th>
              <th className="py-3 px-2 text-[#656575]">Admin ID</th>
              <th className="py-3 px-2 text-[#656575]">Name</th>
              <th className="py-3 px-2 text-[#656575]">Interview Status</th>
              <th className="py-3 px-2 text-[#656575]">Department</th>
              <th className="py-3 px-2 text-[#656575]"></th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-[#eaeaea] text-[#656575]">
              <td className="py-3 px-2">01</td>
              <td className="py-3 px-2">6485</td>
              <td className="py-3 px-2">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-gray-200 overflow-hidden">
                    <img
                        src={"/user1.jpg"}
                      alt="Ayush Ghoshal"
                      width={32}
                      height={32}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span>Ayush Ghoshal</span>
                </div>
              </td>
              <td className="py-3 px-2">
                <div className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-green-500 mr-2 shadow-[0_0_6px_2px_rgba(34,197,94,0.7)]" />
                  Completed
                </div>
              </td>
              <td className="py-3 px-2">CSE</td>
              <td className="py-3 px-2">
                <button className="text-white text-sm px-3 py-1 rounded bg-blue-600 hover:bg-blue-700">
                  Details
                </button>
              </td>
            </tr>
            <tr className="text-[#656575]">
              <td className="py-3 px-2">02</td>
              <td className="py-3 px-2">5665</td>
              <td className="py-3 px-2">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-gray-200 overflow-hidden">
                    <img
                      src={"/user2.jpg"}
                      alt="Biswadip Saha"
                      width={32}
                      height={32}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span>Biswadip Saha</span>
                </div>
              </td>
              <td className="py-3 px-2">
                <div className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-blue-500 mr-2 shadow-[0_0_6px_2px_rgba(59,130,246,0.7)]" />
                  Pending
                </div>
              </td>
              <td className="py-3 px-2">IT</td>
              <td className="py-3 px-2">
                <button className="text-white text-sm px-3 py-1 rounded bg-blue-600 hover:bg-blue-700">
                  Details
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
