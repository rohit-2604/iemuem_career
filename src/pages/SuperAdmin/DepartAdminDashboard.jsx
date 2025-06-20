

import { useState } from "react"
import { Plus, Search } from "lucide-react"
import user from "../../assets/superadmin/user1.jpg"

const adminsData = [
  { adminId: "6465", name: "Ayush Ghoshal", department: "CSE", avatar: user },
  { adminId: "5666", name: "Biswadip Saha", department: "IT", avatar: user  },
  { adminId: "5667", name: "Arjun Das", department: "ECE", avatar: user  },
  { adminId: "5668", name: "Sneha Roy", department: "ME", avatar: user  },
  { adminId: "5669", name: "Rajiv Sen", department: "IT", avatar: user},
  { adminId: "5670", name: "Nikita Sharma", department: "CSE", avatar: user },
]

export default function DepartmentAdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredAdmins = adminsData.filter(
    (admin) =>
      admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.department.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="w-full lg:w-1/4 ">
          <div className="bg-white rounded-lg shadow p-4 h-full ">
            <button
              onClick={() => console.log("Add New Admin")}
              className="w-full flex items-center justify-center gap-30 bg-[#367aff] text-white font-medium py-3 px-4 rounded-lg hover:bg-blue-700 transition"
            >
              <Plus className="w-8 h-8 bg-white text-[#367aff] rounded-lg " />
              <div className="text-xl">

              Add New Admin
              </div>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full lg:w-3/4">
          <div className="bg-white rounded-lg shadow p-6">
            {/* Search Input */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by Department Admin Name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
              />
            </div>

            {/* Table Header */}
            <h2 className="text-lg font-semibold text-gray-800 mb-4">All Department Admins</h2>
            <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-500  pb-2">
              <div className="col-span-1">No.</div>
              <div className="col-span-2">Admin ID</div>
              <div className="col-span-4">Name</div>
              <div className="col-span-3">Department</div>
              {/* <div className="col-span-2 text-center">Actions</div> */}
            </div>

            {/* Admin Rows */}
            <div className="mt-4 space-y-2 ">
              {filteredAdmins.map((admin, index) => (
                <div
                  key={admin.adminId}
                  className="grid grid-cols-12 gap-4 items-center text-sm bg-white hover:bg-gray-50  px-2 py-3 border-t border-[#e8e8e8]"
                >
                  <div className="col-span-1 text-gray-600">{String(index + 1).padStart(2, "0")}</div>
                  <div className="col-span-2">
                    <span className="bg-gray-100 px-2 py-1 rounded font-mono text-gray-700 text-sm">
                      {admin.adminId}
                    </span>
                  </div>
                  <div className="col-span-4 flex items-center gap-3">
                    <img
                      src={admin.avatar}
                      alt={admin.name}
                      className="h-8 w-8 rounded-full object-cover bg-gray-200"
                    />
                    <span className="text-gray-900 font-medium">{admin.name}</span>
                  </div>
                  <div className="col-span-3 text-gray-600">{admin.department}</div>
                  <div className="col-span-2 flex justify-center">
                    <button
                      onClick={() => console.log("Details", admin)}
                      className="text-sm px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                      Details
                    </button>
                  </div>
                </div>
              ))}

              {filteredAdmins.length === 0 && (
                <div className="text-center text-gray-500 py-6">No admins found matching your search.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
