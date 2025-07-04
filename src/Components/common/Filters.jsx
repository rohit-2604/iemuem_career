import { useEffect, useState } from "react";
import { SlidersHorizontal, Building2, CopyCheck } from "lucide-react";
import IconDropdown from "./IconDropdown";
import { useHttp } from "../../hooks/useHttp";

const statusOptions = [
  { value: "", label: "Form Status" },
  { value: "live", label: "Live" },
  { value: "closed", label: "Closed" },
  { value: "pending", label: "Pending" },
];

function Filters({ onFilterChange }) {
  const { getReq } = useHttp();
  const [departmentOptions, setDepartmentOptions] = useState([
    { value: "", label: "Department" },
  ]);
  const [loading, setLoading] = useState(true);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  useEffect(() => {
    const fetchDepartments = async () => {
      setLoading(true);
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      try {
        const response = await getReq("api/v1/department/getAllDepartments", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const departmentsArray = Array.isArray(response?.data)
          ? response.data
          : [];
        const options = [
          { value: "", label: "Department" },
          ...departmentsArray.map((dept) => ({
            value: dept.name,
            label: dept.name,
          })),
        ];
        setDepartmentOptions(options);
      } catch (err) {
        setDepartmentOptions([{ value: "", label: "Department" }]);
      } finally {
        setLoading(false);
      }
    };
    fetchDepartments();
  }, []);

  useEffect(() => {
    if (onFilterChange) {
      onFilterChange({ department: selectedDepartment, status: selectedStatus });
    }
  }, [selectedDepartment, selectedStatus, onFilterChange]);

  return (
    <div className="flex items-center gap-5 text-gray-700">
      {/* Filter label with icon */}
      {/* <div className="flex items-center space-x-2">
        <SlidersHorizontal className="w-5 h-5" />
        <span className="text-md font-medium">Filter</span>
      </div> */}
      <IconDropdown
        icon={Building2}
        options={departmentOptions}
        disabled={loading}
        value={selectedDepartment}
        onChange={e => setSelectedDepartment(e.target.value)}
      />
      <IconDropdown
        icon={CopyCheck}
        options={statusOptions}
        value={selectedStatus}
        onChange={e => setSelectedStatus(e.target.value)}
      />
    </div>
  );
}

export default Filters;
