import { useState } from "react";

export default function EditDepartmentModal({ isOpen, onClose, department }) {


  const [formData, setFormData] = useState(department || defaultDepartment);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSwitchChange = (field, checked) => {
    setFormData((prev) => ({ ...prev, [field]: checked }));
  };

  const handleSaveChanges = () => {
    console.log("Saving changes:", formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-40 backdrop-blur-sm ">
      <div className="bg-white rounded-lg w-full max-w-md shadow-lg overflow-hidden p-6">
        {/* Header */}
<div className="flex items-center justify-between px-6 py-4 border-b">
  <div className="flex-1 text-center">
    <h2 className="text-lg font-semibold text-gray-900">Edit Department</h2>
  </div>
  <button
    onClick={onClose}
    className="h-6 w-6 text-gray-500 hover:text-white hover:bg-red-500 rounded "
    aria-label="Close"
  >
    ✕
  </button>
</div>



        {/* Body */}
        <div className="px-6 py-4 space-y-4 ">
          {[
            { id: "departmentName", label: "Department Name", field: "name" },
            { id: "description", label: "Description", field: "description" },
          ].map(({ id, label, field, type }) => (
            <div key={id} className="space-y-1">
              <label htmlFor={id} className="text-sm ">
                {label}
              </label>
              <input
                id={id}
                type={type || "text"}
                value={formData[field] || ""}
                onChange={(e) => handleInputChange(field, e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}

          {/* Switches */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <label htmlFor="allowPostJobs" className="text-sm ">
                Allow Department Admin to Post Jobs?
              </label>
              <button
                onClick={() =>
                  handleSwitchChange("allowAdminToPostJobs", !formData.allowAdminToPostJobs)
                }
                className={`w-11 h-6 flex items-center rounded-full p-1 duration-300 ${
                  formData.allowAdminToPostJobs ? "bg-blue-500" : "bg-gray-300"
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${
                    formData.allowAdminToPostJobs ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <label htmlFor="autoApproval" className="text-sm ">
                Enable Auto-Approval for Job Posts
              </label>
              <button
                onClick={() =>
                  handleSwitchChange("enableAutoApproval", !formData.enableAutoApproval)
                }
                className={`w-11 h-6 flex items-center rounded-full p-1 duration-300 ${
                  formData.enableAutoApproval ? "bg-blue-500" : "bg-gray-300"
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${
                    formData.enableAutoApproval ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 ">
          <button
            onClick={handleSaveChanges}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
