import { useState, useMemo } from "react";
import Filters from "../../Components/common/Filters";
import SearchBar from "../../Components/common/SearchBar";
import CreateButton from "../../Components/common/CreateButton";

const allDepartments = [
  {
    no: "01",
    department: "CSE",
    adminName: "Ayush Ghoshal",
    formStatus: "Live",
    applicants: 125,
    openings: 7,
    roleName: "Cloud Assistant Professor",
  },
  {
    no: "02",
    department: "ECE",
    adminName: "Biswadip Saha",
    formStatus: "Live",
    applicants: 36,
    openings: 4,
    roleName: "Microprocessor Professor",
  },
  {
    no: "03",
    department: "ECE",
    adminName: "Biswadip Saha",
    formStatus: "Closed",
    applicants: 36,
    openings: 4,
    roleName: "Microprocessor Professor",
  },
];

const drafts = [
  {
    no: "04",
    department: "ECE",
    adminName: "Biswadip Saha",
    formStatus: "Pending",
    openings: 4,
    roleName: "Microprocessor Professor",
  },
];

function Forms() {
  const [searchText, setSearchText] = useState("");
  const [filters, setFilters] = useState({ department: "", status: "" });

  const filteredDepartments = useMemo(() => {
    let filtered = allDepartments;

    if (filters.department) {
      filtered = filtered.filter(
        (dept) => dept.department === filters.department
      );
    }

    if (filters.status) {
      filtered = filtered.filter(
        (dept) =>
          dept.formStatus.toLowerCase() === filters.status.toLowerCase()
      );
    }

    if (searchText) {
      const lowerSearch = searchText.toLowerCase();
      filtered = filtered.filter(
        (dept) =>
          dept.department.toLowerCase().includes(lowerSearch) ||
          dept.adminName.toLowerCase().includes(lowerSearch) ||
          dept.roleName.toLowerCase().includes(lowerSearch)
      );
    }

    return filtered;
  }, [filters, searchText]);

  const handleSearch = (text) => {
    if (text !== searchText) {
      setSearchText(text);
    }
  };

  const handleFilterChange = (newFilters) => {
    if (
      newFilters.department !== filters.department ||
      newFilters.status !== filters.status
    ) {
      setFilters(newFilters);
    }
  };

  const getStatusText = (status) => {
    const getDotColor = (status) => {
      switch (status) {
        case "Live":
          return "bg-green-500 shadow-[0_0_6px_2px_rgba(34,197,94,0.7)]";
        case "Closed":
          return "bg-red-500 shadow-[0_0_6px_2px_rgba(239,68,68,0.7)]";
        case "Pending":
          return "bg-blue-500 shadow-[0_0_6px_2px_rgba(59,130,246,0.7)]";
        default:
          return "bg-gray-400";
      }
    };

    return (
      <span className="inline-flex items-center gap-2">
        <span className={`w-2.5 h-2.5 rounded-full ${getDotColor(status)}`}></span>
        {status}
      </span>
    );
  };

  return (
    <div className="flex min-h-screen inter">
      <div className="flex w-full flex-col bg-[#f3f4f6] p-10 gap-y-8">
        {/* Search, Filters, Create Form */}
        <div className="flex justify-end items-center gap-5">
          <div className="flex-1">
            <SearchBar onSearch={handleSearch} />
          </div>
          <Filters onFilterChange={handleFilterChange} />
          <CreateButton label="Create New Job" url="/superadmin/forms/create-job" />
        </div>

        {/* Search Results */}
        <div className="w-full bg-white p-6 rounded-2xl shadow-2xl">
          <h1 className="text-2xl mb-4">Search Results</h1>
          <table className="w-full table-auto border-gray-500">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2">No.</th>
                <th className="px-4 py-2">Department</th>
                <th className="px-4 py-2">Admin Name</th>
                <th className="px-4 py-2">Form Status</th>
                <th className="px-4 py-2">Applicants</th>
                <th className="px-4 py-2">Openings</th>
                <th className="px-4 py-2">Role Name</th>
              </tr>
            </thead>
            <tbody>
              {filteredDepartments.map((item, index) => (
                <tr key={index} className="text-center border-t border-gray-300">
                  <td className="px-4 py-2">{item.no}</td>
                  <td className="px-4 py-2">{item.department}</td>
                  <td className="px-4 py-2">{item.adminName}</td>
                  <td className="px-4 py-2">{getStatusText(item.formStatus)}</td>
                  <td className="px-4 py-2">{item.applicants}</td>
                  <td className="px-4 py-2">{item.openings}</td>
                  <td className="px-4 py-2">{item.roleName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Forms in Draft */}
        <div className="w-full bg-white p-6 rounded-2xl shadow-2xl">
          <h1 className="text-2xl mb-4">Forms in Draft</h1>
          <table className="w-full table-auto border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2">No.</th>
                <th className="px-4 py-2">Department</th>
                <th className="px-4 py-2">Admin Name</th>
                <th className="px-4 py-2">Form Status</th>
                <th className="px-4 py-2">Openings</th>
                <th className="px-4 py-2">Role Name</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {drafts.map((form, index) => (
                <tr key={index} className="text-center border-t border-gray-300">
                  <td className="px-4 py-2">{form.no}</td>
                  <td className="px-4 py-2">{form.department}</td>
                  <td className="px-4 py-2">{form.adminName}</td>
                  <td className="px-4 py-2">{getStatusText(form.formStatus)}</td>
                  <td className="px-4 py-2">{form.openings}</td>
                  <td className="px-4 py-2">{form.roleName}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => alert(`Publishing ${form.no}`)}
                      className="bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      Publish
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Forms;
