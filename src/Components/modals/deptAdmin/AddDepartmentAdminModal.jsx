import React, { useEffect, useState } from "react";
import { ListRestart } from "lucide-react";
import IconDropdown from "../../common/IconDropdown";
import { useHttp } from "../../../hooks/useHttp";

export default function AddDepartmentAdminModal({
  formData,
  setFormData,
  resetForm,
  focusedField,
  setFocusedField,
  onClose,
}) {
  const [departments, setDepartments] = useState([{ value: "", label: "Department" }]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false); // Optional loading state for Create

  const { getReq, postReq } = useHttp();

  useEffect(() => {
    const fetchDepartments = async () => {
      setLoading(true);
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      try {
        const response = await getReq("api/v1/department/getAllDepartments", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const departmentsArray = Array.isArray(response?.data) ? response.data : [];
        const options = [
          { value: "", label: "Department" },
          ...departmentsArray.map((dept) => ({
            value: dept.name,
            label: dept.name,
          })),
        ];
        setDepartments(options);
      } catch (err) {
        setDepartments([{ value: "", label: "Department" }]);
      } finally {
        setLoading(false);
      }
    };
    fetchDepartments();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreate = async () => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    setSubmitting(true);
    try {
      const response = await postReq("/api/v1/departmentadmin/register", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Successfully added admin:", response);
      onClose();
    } catch (error) {
      console.error("Error registering admin:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur bg-opacity-40 flex justify-center items-center z-50">
      <div className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-lg overflow-visible">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-white hover:bg-[#919191] rounded-full w-8 h-8 flex items-center justify-center transition"
          aria-label="Close"
        >
          ✕
        </button>

        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Add New Department Admin
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
                  : "Admin Email Address"}
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
              Department Name
            </label>
            {loading ? (
              <p className="text-gray-500">Loading departments...</p>
            ) : (
              <IconDropdown
                options={departments}
                value={formData.department}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, department: e.target.value }))
                }
                onFocus={() => setFocusedField("department")}
                onBlur={() => setFocusedField(null)}
              />
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 space-y-3">
          <button
            onClick={handleCreate}
            disabled={submitting}
            className={`w-full flex items-center justify-center ${
              submitting ? "bg-blue-400" : "bg-[#367aff] hover:bg-blue-700"
            } text-white font-medium py-3 px-4 rounded-lg transition`}
          >
            {submitting ? "Creating..." : "Create"}
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
  );
}
