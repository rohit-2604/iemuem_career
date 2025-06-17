import { useEffect, useState } from "react";
import DepartmentCard from "./DepartmentCard";
import fallbackImage from "../../../assets/superadmin/department.png";
import { useHttp } from "../../../hooks/useHttp";

export default function DepartmentGrid() {
  const { getReq, loading } = useHttp();
  const [departments, setDepartments] = useState([]);

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

        if (response?.success && Array.isArray(response?.data?.departments)) {
          setDepartments(response.data.departments);
        } else {
          console.error("❌ Failed to fetch departments:", response?.message || "Unknown error");
        }
      } catch (err) {
        console.error("❌ Error while fetching departments:", err);
      }
    };

    fetchDepartments();
  }, []);

  if (loading) return <p>Loading departments...</p>;

  if (!departments.length) return <p>No departments found.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {departments.map((department, index) => (
        <DepartmentCard
          key={department._id || index}
          name={department.name}
          admin={department.admin}
          activeForms={department.activeForms}
          image={department.image || fallbackImage}
        />
      ))}
    </div>
  );
}
