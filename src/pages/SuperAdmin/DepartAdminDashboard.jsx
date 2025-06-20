import { useState } from "react";
import {
  Plus,
  Search,
  ListRestart,
  UserRoundPen,
} from "lucide-react";
import user from "../../assets/superadmin/user1.jpg";
import DepartmentAdminModal from "../../Components/modals/Department/DepartmentAdminModal";

const adminsData = [
  { adminId: "6465", name: "Ayush Ghoshal", department: "CSE", avatar: user },
  { adminId: "5666", name: "Biswadip Saha", department: "IT", avatar: user },
  { adminId: "5667", name: "Arjun Das", department: "ECE", avatar: user },
  { adminId: "5668", name: "Sneha Roy", department: "ME", avatar: user },
  { adminId: "5669", name: "Rajiv Sen", department: "IT", avatar: user },
  { adminId: "5670", name: "Nikita Sharma", department: "CSE", avatar: user },
];

export default function DepartmentAdminDashboard() {
  const initialForm = {
    name: "",
    adminId: "",
    phone: "",
    email: "",
    department: "",
    departmentCodes: ["", "", ""],
  };

  const [formData, setFormData] = useState(initialForm);
  const [searchTerm, setSearchTerm] = useState("");
  const [focusedField, setFocusedField] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDepartmentCodeChange = (index, value) => {
    const updatedCodes = [...formData.departmentCodes];
    updatedCodes[index] = value;
    setFormData((prev) => ({ ...prev, departmentCodes: updatedCodes }));
  };

  const resetForm = () => setFormData(initialForm);

  const filteredAdmins = adminsData.filter(
    (admin) =>
      admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Form */}
        <div className="w-full lg:w-1/4">
          <div className="bg-white rounded-lg shadow p-4 h-full">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
              Create New Admin
            </h2>

            <div className="space-y-4">
              {["name", "adminId", "phone", "email"].map((name) => (
                <div key={name}>
                  <label
                    className={`text-sm block mb-1 ${
                      focusedField === name
                        ? "text-blue-600 font-medium"
                        : "text-gray-600"
                    }`}
                  >
                    {name === "name"
                      ? "Department Admin Name"
                      : name === "adminId"
                      ? "Admin ID No."
                      : name === "phone"
                      ? "Phone Number"
                      : "Email Address"}
                  </label>
                  <input
                    type={name === "email" ? "email" : "text"}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    onFocus={() => setFocusedField(name)}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 ${
                      focusedField === name
                        ? "border-blue-500 ring-blue-500"
                        : "border-gray-300"
                    }`}
                  />
                </div>
              ))}

              <div>
                <label
                  className={`text-sm block mb-1 ${
                    focusedField === "department"
                      ? "text-blue-600 font-medium"
                      : "text-gray-600"
                  }`}
                >
                  Assign Department
                </label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("department")}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 bg-white ${
                    focusedField === "department"
                      ? "border-blue-500 ring-blue-500"
                      : "border-gray-300"
                  }`}
                >
                  <option value="">Select Department</option>
                  <option value="IT">Information Technology</option>
                  <option value="CSE">Computer Science</option>
                  <option value="ECE">Electronics</option>
                </select>
              </div>

              {formData.departmentCodes.map((code, index) => {
                const fieldName = `departmentCode${index}`;
                return (
                  <div key={index}>
                    <label
                      className={`text-sm block mb-1 ${
                        focusedField === fieldName
                          ? "text-blue-600 font-medium"
                          : "text-gray-600"
                      }`}
                    >
                      Department Code {index + 1}
                    </label>
                    <input
                      type="text"
                      value={code}
                      onChange={(e) =>
                        handleDepartmentCodeChange(index, e.target.value)
                      }
                      onFocus={() => setFocusedField(fieldName)}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 ${
                        focusedField === fieldName
                          ? "border-blue-500 ring-blue-500"
                          : "border-gray-300"
                      }`}
                    />
                  </div>
                );
              })}
            </div>

            {/* Buttons */}
            <div className="mt-6 space-y-3">
              <button
                onClick={() => console.log("Add New Admin", formData)}
                className="w-full flex items-center justify-center bg-[#367aff] text-white font-medium py-3 px-4 rounded-lg hover:bg-blue-700 transition"
              >
                <Plus className="w-5 h-5 mr-2 bg-white text-[#367aff] rounded" />
                Add New Admin
              </button>

              <button
                onClick={resetForm}
                className="w-full flex items-center justify-center bg-gray-200 text-black font-medium py-3 px-4 rounded-lg hover:bg-gray-300 transition"
              >
                <ListRestart className="w-5 h-5 mr-2" />
                Reset Form
              </button>
            </div>
          </div>
        </div>

        {/* Main Admin Table */}
        <div className="w-full lg:w-3/4 space-y-4">
          <div className="bg-white rounded-lg shadow">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by Admin Name or Department"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300 bg-white"
              />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              All Department Admins
            </h2>

            <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-500 pb-2">
              <div className="col-span-1">No.</div>
              <div className="col-span-2">Admin ID</div>
              <div className="col-span-4">Name</div>
              <div className="col-span-3">Department</div>
            </div>

            <div className="mt-4 space-y-2">
              {filteredAdmins.length > 0 ? (
                filteredAdmins.map((admin, index) => (
                  <div
                    key={admin.adminId}
                    className="grid grid-cols-12 gap-4 items-center text-sm bg-white hover:bg-gray-50 px-2 py-3 border-t border-gray-200"
                  >
                    <div className="col-span-1 text-gray-600">
                      {String(index + 1).padStart(2, "0")}
                    </div>
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
                      <span className="text-gray-900 font-medium">
                        {admin.name}
                      </span>
                    </div>
                    <div className="col-span-3 text-gray-600">
                      {admin.department}
                    </div>
                    <div className="col-span-2 flex justify-center gap-2">
                      <button
                        onClick={() => console.log("Details", admin)}
                        className="text-sm px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                      >
                        Details
                      </button>

                      <button
                        onClick={() => {
                          setSelectedAdmin({
                            ...initialForm,
                            ...admin,
                            departmentCodes: ["", "", ""],
                          });
                          setIsModalOpen(true);
                        }}
                        className="text-sm px-3 py-1 flex items-center gap-1 bg-[#e8e8e8] text-black rounded hover:bg-gray-300 transition"
                      >
                        <UserRoundPen className="w-4 h-4" />
                        Edit
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500 py-6">
                  No admins found matching your search.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedAdmin && (
        <DepartmentAdminModal
          formData={selectedAdmin}
          handleChange={(e) => {
            const { name, value } = e.target;
            setSelectedAdmin((prev) => ({ ...prev, [name]: value }));
          }}
          handleDepartmentCodeChange={(index, value) => {
            const updatedCodes = [...selectedAdmin.departmentCodes];
            updatedCodes[index] = value;
            setSelectedAdmin((prev) => ({
              ...prev,
              departmentCodes: updatedCodes,
            }));
          }}
          resetForm={() => setSelectedAdmin(initialForm)}
          setFocusedField={setFocusedField}
          focusedField={focusedField}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
