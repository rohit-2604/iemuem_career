import React, { useState, useEffect, useRef } from "react";
import SearchBar from "../../Components/common/SearchBar";
import DepartmentGrid from "../../Components/superadmin/department/DepartmentGrid";
import CreateDepartmentModal from "../../Components/modals/Department/CreateDepartmentModal";
import EditDepartmentModal from "../../Components/modals/Department/EditDepartmentModal";
import { useHttp } from "../../hooks/useHttp";
import CreateButton from "../../Components/common/CreateButton";
import DotSpinner from "../../Components/common/DotSpinner";

export default function Departments() {
  const [departments, setDepartments] = useState([]);
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const { getReq } = useHttp();
  const didInitialSearch = useRef(false);

  // Fetch departments on mount
  useEffect(() => {
    const fetchDepartments = async () => {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");

      if (!token) {
        console.error("❌ No auth token found.");
        window.location.href = "/login";
        return;
      }

      try {
        const response = await getReq("api/v1/department/getAllDepartments", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const departmentsArray = Array.isArray(response?.data)
          ? response.data
          : [];

        setDepartments(departmentsArray);
        setFilteredDepartments(departmentsArray);
      } catch (err) {
        console.error("❌ Error fetching departments:", err);
        if (err.response?.status === 401) {
          console.warn("⚠️ Unauthorized, redirecting to login...");
          window.location.href = "/login";
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  // Modal handlers
  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true);
  };

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
        <div className="flex items-center gap-5 min-w-full">
          <div className="flex-1">
            <SearchBar onSearch={handleSearch} />
          </div>
          <CreateButton
            label="Create New Department"
            onClick={handleOpenCreateModal}
          />
        </div>

        {/* Department Grid */}
        <div className="mt-6">
          {loading ? (
            <div className="flex justify-center items-center py-10">
              <DotSpinner size={40} />
            </div>
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
