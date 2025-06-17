// // src/context/SuperAdmin/DepartmentContext.jsx

// import { createContext, useContext, useState, useEffect } from "react";
// import { useHttp } from "../../hooks/useHttp";
// import { useLocation } from "react-router-dom";

// const DepartmentContext = createContext();

// export const DepartmentProvider = ({ children }) => {
//   const [deptData, setDeptData] = useState([]);
//   const [selectedDepartment, setSelectedDepartment] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const { postReq } = useHttp();
//   const location = useLocation();

//   const token =
//     localStorage.getItem("token") || sessionStorage.getItem("token");
//   const role = localStorage.getItem("role");

//   // Routes where API call should be avoided
//   const excludedPaths = [
//     "/superadmin/login",
//     "/change-password",
//     "/update-password",
//     "/forget-password",
//     "/verify-otp",
//     "/moderator/login",
//     "/department/login",
//     "/moderator/dashboard",
//     "/department/dashboard",
//   ];

//   const isExcludedPath = excludedPaths.some((path) =>
//     new RegExp(`^${path.replace(":userPath", ".*")}$`).test(location.pathname)
//   );

//   const fetchDepartments = async () => {
//     if (!token) {
//       console.warn("No token available for fetching departments");
//       return;
//     }

//     setLoading(true);
//     try {
//       let endpoint;

//       // FIX: Added proper endpoints based on role
//       if (role === "moderator") {
//         endpoint = "api/v1/moderator/departments";
//       } else if (role === "department") {
//         endpoint = "api/v1/department/info";
//       } else {
//         endpoint = "api/v1/department/getAllDepartments"; // Default for superadmin
//       }

//       // FIX: Proper error handling and response validation
//       const response = await postReq(endpoint, token);
      
//       // FIX: Better response validation
//       if (response && response.success && response.data) {
//         setDeptData(Array.isArray(response.data) ? response.data : []);
//       } else {
//         console.error("Invalid response format:", response);
//         setDeptData([]);
//       }
//     } catch (error) {
//       console.error("Failed to fetch departments:", error);
//       setDeptData([]); // FIX: Reset to empty array on error
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (!isExcludedPath && token && role) {
//       fetchDepartments();
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [location.pathname, token, role]); // FIX: Added token and role as dependencies

//   return (
//     <DepartmentContext.Provider
//       value={{
//         deptData,
//         setDeptData,
//         fetchDepartments,
//         selectedDepartment,
//         setSelectedDepartment,
//         showModal,
//         setShowModal,
//         loading,
//       }}
//     >
//       {children}
//     </DepartmentContext.Provider>
//   );
// };

// export const useDepartment = () => {
//   const context = useContext(DepartmentContext);
//   if (!context) {
//     throw new Error("useDepartment must be used within a DepartmentProvider");
//   }
//   return context;
// };