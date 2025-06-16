import { useEffect, useState } from "react";
import DepartmentCard from "./DepartmentCard";
import img from "../../../assets/superadmin/department.png";
import { useHttp } from "../../../hooks/useHttp";

export default function DepartmentGrid() {
  const { getReq, loading } = useHttp();
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");

      console.log("📦 Fetched token:", token);

      if (!token) {
        console.error("❌ No auth token found");
        return;
      }

      const res = await getReq("api/v1/department/getAllDepartments", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("📥 Full department response:", res);

      if (res?.success && Array.isArray(res?.data?.departments)) {
        setDepartments(res.data.departments);
      } else {
        console.error("❌ Failed to fetch departments:", res?.message || "Unknown error");
      }
    };

    fetchDepartments();
  }, []);

  if (loading) return <p>Loading departments...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {departments.map((department, index) => (
        <DepartmentCard
          key={index}
          name={department.name}
          admin={department.admin}
          activeForms={department.activeForms}
          image={department.image || img}
        />
      ))}
    </div>
  );
}
