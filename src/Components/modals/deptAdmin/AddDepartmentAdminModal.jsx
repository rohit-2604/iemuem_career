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
  updateAdminsList, // Receive updateAdminsList prop from parent
  refreshAdminsList, // Optional: for refreshing the entire list
}) {
  const [departments, setDepartments] = useState([{ value: "", label: "Department" }]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const { getReq, postReq } = useHttp();

  // Fetch departments when the modal is mounted
  useEffect(() => {
    const fetchDepartments = async () => {
      setLoading(true);
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      try {
        const response = await getReq("api/v1/department/getAllDepartments", {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        const departmentsArray = Array.isArray(response?.data) ? response.data : [];
        
        // Filter to only include departments without an admin
        const departmentsWithoutAdmin = departmentsArray.filter((dept) => dept.departmentAdmin === null || dept.departmentAdmin === undefined);
        
        const options = [
          { value: "", label: "Department" },
          ...departmentsWithoutAdmin.map((dept) => ({
            value: dept._id,  // Use department ID for value
            label: dept.name,
          })),
        ];

        setDepartments(options);
      } catch (err) {
        console.error("Error fetching departments:", err);
        setDepartments([{ value: "", label: "Department" }]);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle the creation of the new department admin
  const handleCreate = async () => {
    const { name, email, phone, departmentId } = formData;

    // Basic validation
    if (!name || !email || !phone || !departmentId) {
      alert("Please fill all the fields before submitting.");
      return;
    }

    const token = localStorage.getItem("token") || sessionStorage.getItem("token");

    // Prepare the payload to send to the backend
    const payload = { 
      name, 
      email, 
      phoneNo: phone, 
      department: departmentId 
    };

    setSubmitting(true);

    try {
      const response = await postReq("/api/v1/departmentadmin/register", payload, token);

      console.log("Successfully added admin:", response);

      // Get the selected department name for the new admin
      const selectedDepartment = departments.find(dept => dept.value === departmentId);
      const departmentName = selectedDepartment ? selectedDepartment.label : "N/A";


      const newAdminForState = {
        _id: response.data._id,
        name: response.data.name,
        phoneNo: response.data.phoneNo,
        email: response.data.email,
        department: {
          _id: departmentId,
          name: departmentName
        },
        avatar: response.data.avatar || "/user1.jpg",
        departmentCodes: response.data.departmentCodes || ["", "", ""]
      };


      updateAdminsList(newAdminForState);


      resetForm();


      onClose();


      

    } catch (error) {
      console.error("Error registering admin:", error);
      

      if (error.response?.data?.message) {
        alert(`Error: ${error.response.data.message}`);
      } else {
        alert("Something went wrong, please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };


  const handleClose = () => {
    const hasFormData = formData.name || formData.email || formData.phone || formData.departmentId;
    
    if (hasFormData && !submitting) {
      if (window.confirm("Are you sure you want to close? All unsaved changes will be lost.")) {
        resetForm();
        onClose();
      }
    } else {
      resetForm();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur bg-opacity-40 flex justify-center items-center z-50">
      <div className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-lg overflow-visible">
        {/* Close button */}
        <button
          onClick={handleClose}
          disabled={submitting}
          className="absolute top-4 right-4 text-gray-500 hover:text-white hover:bg-[#919191] rounded-full w-8 h-8 flex items-center justify-center transition disabled:opacity-50"
          aria-label="Close"
        >
          ✕
        </button>

        <h2 className="text-lg font-semibold text-gray-800 mb-4">Add New Department Admin</h2>

        <div className="space-y-4">
          {["name", "phone", "email"].map((name) => (
            <div key={name}>
              <label
                className={`text-sm block mb-1 ${focusedField === name ? "text-blue-600 font-medium" : "text-gray-600"}`}
              >
                {name === "name"
                  ? "Department Admin Name"
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
                disabled={submitting}
                className={`w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 disabled:opacity-50 disabled:bg-gray-100 ${
                  focusedField === name ? "border-blue-500 ring-blue-500" : "border-gray-300"
                }`}
              />
            </div>
          ))}

          <div>
            <label
              className={`text-sm block mb-1 ${focusedField === "department" ? "text-blue-600 font-medium" : "text-gray-600"}`}
            >
              Department Name
            </label>
            {loading ? (
              <p className="text-gray-500">Loading departments...</p>
            ) : (
              <IconDropdown
                options={departments}
                value={formData.departmentId}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, departmentId: e.target.value }))
                }
                onFocus={() => setFocusedField("department")}
                onBlur={() => setFocusedField(null)}
                disabled={submitting}
              />
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 space-y-3">
          <button
            onClick={handleCreate}
            disabled={submitting || loading}
            className={`w-full flex items-center justify-center ${
              submitting || loading 
                ? "bg-blue-400 cursor-not-allowed" 
                : "bg-[#367aff] hover:bg-blue-700"
            } text-white font-medium py-3 px-4 rounded-lg transition`}
          >
            {submitting ? "Creating..." : "Create"}
          </button>

          <button
            onClick={resetForm}
            disabled={submitting}
            className="w-full flex items-center justify-center bg-gray-200 text-black font-medium py-3 px-4 rounded-lg hover:bg-gray-300 transition disabled:opacity-50"
          >
            <ListRestart className="w-5 h-5 mr-2" />
            Reset Form
          </button>
        </div>
      </div>
    </div>
  );
}