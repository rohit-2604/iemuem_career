import React, { useState, useEffect, useRef } from "react";
import { PlusIcon } from "lucide-react";
import SearchBar from "../../Components/superadmin/department/SearchBar";
import DepartmentGrid from "../../Components/superadmin/department/DepartmentGrid";
import CreateDepartmentModal from "../../Components/modals/Department/CreateDepartmentModal";
import EditDepartmentModal from "../../Components/modals/Department/EditDepartmentModal";
import { useHttp } from "../../hooks/useHttp";

export default function Departments() {
  const [departments, setDepartments] = useState([]);
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const { getReq } = useHttp();
  const didInitialSearch = useRef(false); // Prevent early filter

  // Fetch departments
  useEffect(() => {
    const fetchDepartments = async () => {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");

      if (!token) {
        console.error("❌ No auth token found.");
        return;
      }

      try {
        const response = await getReq("api/v1/department/getAllDepartments", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("🌐 Fetched department response:", response);

        const departmentsArray = Array.isArray(response?.data)
          ? response.data
          : [];

        if (departmentsArray.length === 0) {
          console.warn("⚠️ No departments found.");
        }

        setDepartments(departmentsArray);
        setFilteredDepartments(departmentsArray);
      } catch (err) {
        console.error("❌ Error fetching departments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  // Modal handlers
  const handleOpenCreateModal = () => setIsCreateModalOpen(true);

  const handleCloseCreateModal = (newDept = null) => {
    setIsCreateModalOpen(false);
    if (newDept) {
      const updated = [...departments, newDept];
      setDepartments(updated);
      setFilteredDepartments(updated);
    }
  };

  const handleEditClick = (dept) => {
    setSelectedDepartment(dept);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = (updatedDept = null) => {
    setIsEditModalOpen(false);
    setSelectedDepartment(null);

    if (updatedDept) {
      const updatedList = departments.map((dept) =>
        dept._id === updatedDept._id ? updatedDept : dept
      );
      setDepartments(updatedList);
      setFilteredDepartments(updatedList);
    }
  };

  // Search logic
  const handleSearch = (searchText) => {
    if (!didInitialSearch.current) {
      didInitialSearch.current = true;
    }

    if (!searchText) {
      setFilteredDepartments(departments);
    } else {
      const lowerSearch = searchText.toLowerCase();
      const filtered = departments.filter((dept) =>
        dept.name.toLowerCase().includes(lowerSearch)
      );
      setFilteredDepartments(filtered);
    }
  };

  return (
    <div className="min-h-screen bg-[#dddddd] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Controls */}
        <div className="flex items-center gap-4 min-w-full">
          <div className="flex-1">
            <SearchBar onSearch={handleSearch} />
          </div>
          <button
            onClick={handleOpenCreateModal}
            className="flex items-center gap-2 bg-[#367aff] hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            <PlusIcon className="w-4 h-4" />
            Create New Department
          </button>
        </div>

        {/* Department Grid */}
        <div className="mt-6">
          {loading ? (
            <p>Loading departments...</p>
          ) : (
            <>
              <div className="text-sm text-gray-600 mb-2">
                Showing {filteredDepartments.length} departments
              </div>
              <DepartmentGrid
                departments={filteredDepartments}
                onEdit={handleEditClick}
              />
            </>
          )}
        </div>
      </div>

      {/* Create Modal */}
      {isCreateModalOpen && (
        <CreateDepartmentModal
          isOpen={isCreateModalOpen}
          onClose={handleCloseCreateModal}
        />
      )}

      {/* Edit Modal */}
      {isEditModalOpen && selectedDepartment && (
        <EditDepartmentModal
          isOpen={isEditModalOpen}
          onClose={handleCloseEditModal}
          department={selectedDepartment}
        />
      )}
    </div>
  );
}
