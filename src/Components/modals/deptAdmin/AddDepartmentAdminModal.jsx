import React from "react";
import { ListRestart } from "lucide-react";
import IconDropdown from "../../common/IconDropdown";

export default function AddDepartmentAdminModal({
  formData,
  setFormData,
  resetForm,
  focusedField,
  setFocusedField,
  onClose,
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 backdrop-blur bg-opacity-40 flex justify-center items-center z-50">
      <div className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
        {/* X Button */}
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
            <IconDropdown/>
          </div>

          <div>
            {/* <label
              className={`text-sm block mb-1 ${
                focusedField === "departmentCode"
                  ? "text-blue-600 font-medium"
                  : "text-gray-600"
              }`}
            >
              Department Code
            </label>
            <input
              type="text"
              name="departmentCode"
              value={formData.departmentCode}
              onChange={handleChange}
              onFocus={() => setFocusedField("departmentCode")}
              onBlur={() => setFocusedField(null)}
              className={`w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 ${
                focusedField === "departmentCode"
                  ? "border-blue-500 ring-blue-500"
                  : "border-gray-300"
              }`}
            /> */}
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 space-y-3">
          <button
            onClick={() => {
              console.log("Add New Admin", formData);
              onClose();
            }}
            className="w-full flex items-center justify-center bg-[#367aff] text-white font-medium py-3 px-4 rounded-lg hover:bg-blue-700 transition"
          >
            Create
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
