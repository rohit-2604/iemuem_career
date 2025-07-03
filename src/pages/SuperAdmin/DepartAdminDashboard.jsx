import { useState, useEffect } from "react";
import { Plus, UserRoundPen } from "lucide-react";
import DepartmentAdminModal from "../../Components/modals/Department/DepartmentAdminModal";
import AddDepartmentAdminModal from "../../Components/modals/deptAdmin/AddDepartmentAdminModal";
import SearchBar from "../../Components/common/SearchBar";
import CreateButton from "../../Components/common/CreateButton";
import DotSpinner from "../../Components/common/DotSpinner";
import { useHttp } from "../../hooks/useHttp";

export default function DepartmentAdminDashboard() {
  const { getReq } = useHttp();

  const initialForm = {
    name: "",
    adminId: "",
    phone: "",
    email: "",
    departmentId: "",
    departmentName: "",
    departmentCodes: ["", "", ""],
  };

  const [adminsData, setAdminsData] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [searchTerm, setSearchTerm] = useState("");
  const [focusedField, setFocusedField] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [departments, setDepartments] = useState([]); // Departments state

  const resetForm = () => setFormData(initialForm);

  // Function to update the admins list after a new admin is added
  const updateAdminsList = (newAdminResponse) => {
    // Format the new admin data to match the existing structure
    const formattedNewAdmin = {
      adminId: newAdminResponse._id,
      name: newAdminResponse.name || "N/A",
      phone: newAdminResponse.phoneNo,
      email: newAdminResponse.email,
      departmentId: newAdminResponse.department?._id || newAdminResponse.department || "N/A",
      departmentName: newAdminResponse.department?.name || "N/A",
      avatar: newAdminResponse.avatar || "/user1.jpg",
      departmentCodes: newAdminResponse.departmentCodes || ["", "", ""],
    };

    setAdminsData((prevAdmins) => [...prevAdmins, formattedNewAdmin]);
  };

  // Function to handle admin editing
  const handleEditAdmin = (admin) => {
    setSelectedAdmin(admin);
    setIsEditModalOpen(true);
  };

  // Function to refresh the entire admins list
  const refreshAdminsList = async () => {
    setLoading(true);
    try {
      const response = await getReq("/api/v1/departmentadmin/getAllDepartmentAdmins");

      const adminsArray = Array.isArray(response?.data)
        ? response.data
        : response?.data?.admins || [];

      const formattedData = adminsArray.map((admin) => ({
        adminId: admin._id,
        name: admin.name || "N/A",
        phone: admin.phoneNo,
        email: admin.email,
        departmentId: admin.department?._id || "N/A",
        departmentName: admin.department?.name || "N/A",
        avatar: admin.avatar || "/user1.jpg",
        departmentCodes: admin.departmentCodes || ["", "", ""],
      }));

      setAdminsData(formattedData);
    } catch (error) {
      console.error("Failed to refresh department admins:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchAdmins = async () => {
      setLoading(true);
      try {
        const response = await getReq("/api/v1/departmentadmin/getAllDepartmentAdmins");

        const adminsArray = Array.isArray(response?.data)
          ? response.data
          : response?.data?.admins || [];

        const formattedData = adminsArray.map((admin) => ({
          adminId: admin._id, // Store adminId
          name: admin.name || "N/A", // Ensure name is not null or undefined
          phone: admin.phoneNo,
          email: admin.email,
          departmentId: admin.department?._id || "N/A", // Correctly map departmentId
          departmentName: admin.department?.name || "N/A", // Correctly map departmentName
          avatar: admin.avatar || "/user1.jpg", // Ensure avatar is always set
          departmentCodes: admin.departmentCodes || ["", "", ""], // Ensure department codes are set if available
        }));

        setAdminsData(formattedData);
      } catch (error) {
        console.error("Failed to fetch department admins:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmins();
  }, []);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await getReq("/api/v1/department/getAllDepartments");
        setDepartments(response?.data || []);
      } catch (error) {
        console.error("Failed to fetch departments:", error);
      }
    };

    fetchDepartments();
  }, []);

  const filteredAdmins = adminsData.filter(
    (admin) =>
      admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.departmentName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6 inter">
      <div className="flex flex-col gap-6">
        <h1 className="text-xl font-semibold mb-2">Department Admins</h1>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
          <SearchBar onSearch={(value) => setSearchTerm(value)} />
          <CreateButton label="Create new Department Admin" onClick={() => {
            setFormData(initialForm);
            setIsAddModalOpen(true);
          }} />
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

          <div className="mt-4 space-y-2 min-h-[150px]">
            {loading ? (
              <div className="flex justify-center py-10">
                <DotSpinner size={40} />
              </div>
            ) : filteredAdmins.length > 0 ? (
              filteredAdmins.map((admin, index) => (
                <div
                  key={admin.adminId || index} // Ensuring unique key using adminId or index
                  className="grid grid-cols-12 gap-4 items-center text-sm bg-white hover:bg-gray-50 px-2 py-3 border-t border-gray-200"
                >
                  <div className="col-span-1 text-gray-600">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div className="col-span-2">
                    <span className="bg-gray-100 px-2 py-1 rounded font-mono text-gray-700 text-sm">
                      {admin.adminId ? admin.adminId.slice(0, 8) : "N/A"}
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
                    {admin.departmentName}
                  </div>
                  <div className="col-span-2 flex justify-center gap-2">
                    <button
                      onClick={() => console.log("Details", admin)}
                      className="text-sm px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                      Details
                    </button>

                    <button
                      onClick={() => handleEditAdmin(admin)}
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

      {/* Modals */}
      {isEditModalOpen && selectedAdmin && (
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
          onClose={() => setIsEditModalOpen(false)}
        />
      )}

      {isAddModalOpen && (
        <AddDepartmentAdminModal
          formData={formData}
          setFormData={setFormData}
          resetForm={resetForm}
          focusedField={focusedField}
          setFocusedField={setFocusedField}
          onClose={() => setIsAddModalOpen(false)}
          updateAdminsList={updateAdminsList}
          refreshAdminsList={refreshAdminsList}
        />
      )}
    </div>
  );
}