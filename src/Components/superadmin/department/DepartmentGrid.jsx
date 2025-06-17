import React, { useEffect, useState } from "react";
import DepartmentCard from "./DepartmentCard";
import EditDepartmentModal from "../../modals/DepartmentModal"; // ✅ Make sure path is correct
import { useHttp } from "../../../hooks/useHttp";

export default function DepartmentGrid() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const { getReq } = useHttp();

  useEffect(() => {
    const fetchDepartments = async () => {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");

      if (!token) {
        console.error("❌ No auth token found.");
        return;
      }

      try {
        const response = await getReq("api/v1/department/getAllDepartments", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const departmentsArray = response?.data?.departments ?? response?.data;

        if (response?.success && Array.isArray(departmentsArray)) {
          setDepartments(departmentsArray);
        } else {
          console.error("❌ Failed to fetch departments:", response?.message || "Invalid structure");
        }
      } catch (err) {
        console.error("❌ Error while fetching departments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  const handleChangeClick = (department) => {
    setSelectedDepartment(department); // Pass full object
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedDepartment(null);
  };

  if (loading) return <p>Loading departments...</p>;
  if (!departments.length) return <p>No departments found.</p>;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {departments.map((dept, index) => (
          <DepartmentCard
            key={index}
            name={dept.name}
            description={dept.description}
            onChangeClick={() => handleChangeClick(dept)}
          />
        ))}
      </div>

      {isModalOpen && selectedDepartment && (
        <EditDepartmentModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          department={selectedDepartment}
        />
      )}
    </>
  );
}
