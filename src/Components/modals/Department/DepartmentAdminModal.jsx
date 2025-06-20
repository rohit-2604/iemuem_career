import { X } from "lucide-react";
import { useState } from "react";

export default function DepartmentAdminModal({
  formData,
  handleChange,
  handleDepartmentCodeChange,
  resetForm,
  setFocusedField,
  focusedField,
  onClose,
}) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDelete = () => {
    console.log("Deleted admin:", formData);
    // actual delete logic goes here
    setShowDeleteConfirm(false);
    onClose(); // Close modal after deletion
  };

  return (
    <div className="fixed inset-0 z-50 backdrop-blur bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black hover:bg-gray-200 hover:cursor-pointer rounded-full p-1 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
          Department Admin Details
        </h2>

        <div className="space-y-4">
          {[{ label: "Department Admin Name", name: "name" },
            { label: "Admin ID No.", name: "adminId" },
            { label: "Phone Number", name: "phone" },
            { label: "Email Address", name: "email", type: "email" },
          ].map(({ label, name, type = "text" }) => (
            <div key={name}>
              <label
                className={`text-sm block mb-1 ${
                  focusedField === name
                    ? "text-blue-600 font-medium"
                    : "text-gray-600"
                }`}
              >
                {label}
              </label>
              <input
                type={type}
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
              Assign Department
            </label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              onFocus={() => setFocusedField("department")}
              onBlur={() => setFocusedField(null)}
              className={`w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 bg-white ${
                focusedField === "department"
                  ? "border-blue-500 ring-blue-500"
                  : "border-gray-300"
              }`}
            >
              <option value="">Select Department</option>
              <option value="IT">Information Technology</option>
              <option value="CSE">Computer Science</option>
              <option value="ECE">Electronics</option>
            </select>
          </div>

          {formData.departmentCodes.map((code, index) => {
            const fieldName = `departmentCode${index}`;
            return (
              <div key={index}>
                <label
                  className={`text-sm block mb-1 ${
                    focusedField === fieldName
                      ? "text-blue-600 font-medium"
                      : "text-gray-600"
                  }`}
                >
                  Department Code {index + 1}
                </label>
                <input
                  type="text"
                  value={code}
                  onChange={(e) =>
                    handleDepartmentCodeChange(index, e.target.value)
                  }
                  onFocus={() => setFocusedField(fieldName)}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 ${
                    focusedField === fieldName
                      ? "border-blue-500 ring-blue-500"
                      : "border-gray-300"
                  }`}
                />
              </div>
            );
          })}
        </div>

        {/* Main Buttons */}
        <div className="mt-6 flex gap-3">
          <button
            onClick={() => console.log("Save Changes", formData)}
            className="flex-1 flex items-center justify-center bg-[#367aff] text-white font-medium py-3 px-4 rounded-lg hover:cursor-pointer hover:bg-blue-700 transition"
          >
            Save Changes
          </button>

          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="flex-1 flex items-center hover:cursor-pointer justify-center border border-[#e94848] text-[#e94848] font-medium py-3 px-4 rounded-lg hover:bg-red-50 transition"
          >
            Delete Admin
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-xl max-w-md w-full text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Are you sure you want to delete this Admin?
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              This action cannot be undone. Deleting this will permanently remove it from the system.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-6 py-2 border hover:cursor-pointer border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
              >
                No, cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-6 py-2 hover:cursor-pointer bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Yes, Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
