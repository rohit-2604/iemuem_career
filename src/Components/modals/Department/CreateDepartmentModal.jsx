import { useEffect, useState } from "react";
import { useHttp } from "../../../hooks/useHttp";

const defaultDepartment = {
  name: "",
  departmentCode: "",
  description: "",
  departmentAdmin: null, 
  // departmentAdminName: "",
  // AdminId: "",
  // AdminEmail: "",
  // allowAdminToPostJobs: false,
  // enableAutoApproval: false,
};

export default function CreateDepartmentModal({ isOpen, onClose, department }) {
  const { postReq } = useHttp();
  const [formData, setFormData] = useState(department || defaultDepartment);
  const [focusedField, setFocusedField] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (field, checked) => {
    setFormData((prev) => ({ ...prev, [field]: checked }));
  };

const handleSaveChanges = async () => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  const role = localStorage.getItem("role"); // Optional if role is needed

  const name = formData.name.trim();
  const departmentCode = formData.departmentCode.trim();
  const description = formData.description.trim();
  const departmentAdmin = null; 

  if (!token) {
    setError("You are not authenticated.");
    return;
  }

  if (!name || !departmentCode || !description) {
    setError("All fields are required.");
    return;
  }

  const payload = {
    name,
    departmentCode,
    description,
    departmentAdmin
  };



  try {
    setLoading(true);
    setError(null);



    const res = await postReq(
      "api/v1/department/create",
      payload,
      token  
    );

    if (res?.success) {
      const createdDept = res.data?.department || res.data;
      onClose(createdDept);
    } else {
      setError(res?.message || "Failed to create department");
    }
  } catch (err) {
    setError("Something went wrong while creating department.");
  } finally {
    setLoading(false);
  }
};




  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-40 backdrop-blur">
      <div className="bg-white rounded-lg w-full max-w-md shadow-lg overflow-hidden p-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-3">
          <h2 className="text-lg font-semibold text-gray-900 text-center flex-1">
            Create New Department
          </h2>
          <button
            onClick={() => onClose(null)}
            className="text-gray-500 hover:text-white hover:bg-[#919191] rounded-full w-8 h-8 flex items-center justify-center transition"
          >
            ✕
          </button>
        </div>

        {/* Form Fields */}
        <div className="mt-4 space-y-4">
          {[  
            { name: "name", label: "Department Name" },
            { name: "departmentCode", label: "Department Code" },
            { name: "description", label: "Department Description" },

          ].map(({ name, label }) => (
            <div key={name}>
              <label
                className={`text-sm block mb-1 ${focusedField === name ? "text-blue-600 font-medium" : "text-gray-600"}`}
              >
                {label}
              </label>
              <input
                type={name.includes("Email") ? "email" : "text"}
                name={name}
                value={formData[name]}
                onChange={handleInputChange}
                onFocus={() => setFocusedField(name)}
                onBlur={() => setFocusedField(null)}
                className={`w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 ${focusedField === name ? "border-blue-500 ring-blue-500" : "border-gray-300"}`}
              />
            </div>
          ))}

          {/* Toggles */}
          {/* <div className="pt-2 space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-600">
                Allow Department Admin to Post Jobs?
              </label>
              <button
                role="switch"
                aria-checked={formData.allowAdminToPostJobs}
                onClick={() =>
                  handleSwitchChange("allowAdminToPostJobs", !formData.allowAdminToPostJobs)
                }
                className={`w-11 h-6 flex items-center rounded-full p-1 duration-300 ${formData.allowAdminToPostJobs ? "bg-blue-500" : "bg-gray-300"}`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${formData.allowAdminToPostJobs ? "translate-x-5" : "translate-x-0"}`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-600">
                Enable Auto-Approval for Job Posts
              </label>
              <button
                role="switch"
                aria-checked={formData.enableAutoApproval}
                onClick={() =>
                  handleSwitchChange("enableAutoApproval", !formData.enableAutoApproval)
                }
                className={`w-11 h-6 flex items-center rounded-full p-1 duration-300 ${formData.enableAutoApproval ? "bg-blue-500" : "bg-gray-300"}`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${formData.enableAutoApproval ? "translate-x-5" : "translate-x-0"}`}
                />
              </button>
            </div>
          </div> */}
        </div>

        {/* Footer */}
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="mt-6">
          <button
            onClick={handleSaveChanges}
            disabled={loading}
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {loading ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}
