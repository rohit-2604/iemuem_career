import { Plus } from "lucide-react";
import Filters from "../../Components/superadmin/forms/Filters";
import SearchBar from "../../Components/superadmin/department/SearchBar";
import CreateFormButton from "../../Components/superadmin/forms/CreateFormButton";

// Search logic
const handleSearch = (searchText) => {
  if (!searchText) {
    setFilteredDepartments(departments);
  } else {
    const lowerSearch = searchText.toLowerCase();
    const filtered = departments.filter((dept) =>
      dept.name.toLowerCase().includes(lowerSearch)
    );
    setFilteredDepartments(filtered);
  }
};

function Forms() {
  return (
    <div className="flex min-h-screen inter">
      {/* Main Content */}
      <div className="flex w-full flex-col bg-[#f3f4f6] p-10 gap-y-8">
        {/* search, filters and create form */}
        <div className="flex justify-end items-center gap-10">
          <div className="flex-1"><SearchBar onSearch={handleSearch} /></div>
          <div className="flex">
            <Filters />
          </div>
          <div className="flex">
            <CreateFormButton label="Create New Form" onClick={() => { }} />
          </div>
        </div>
        {/*  search results */}
        <div className="w-full bg-[#fff] p-6 rounded-2xl">
          <h1 className="text-2xl">Search Results</h1>
          <table className="flex flex-col content-between w-full overflow-hidden p-10">
            <thead className="">
              <tr>
                <td className="py-2 px-4 text-center">No.</td>
                <td className="py-2 px-4 text-center">Department</td>
                <td className="py-2 px-4 text-center">Admin Name</td>
                <td className="py-2 px-4 text-center">Form Status</td>
                <td className="py-2 px-4 text-center">Applicants</td>
                <td className="py-2 px-4 text-center">Openings</td>
                <td className="py-2 px-4 text-center">Role Name</td>
              </tr>
            </thead>
            <div className="w-full h-[2px] bg-gray-300"></div>
          </table>
        </div>
        {/* forms draft */}
        <div className="w-full bg-[#fff] p-6 rounded-2xl">
          <h1 className="text-2xl">Forms in Draft</h1>
        </div>
      </div>
    </div>
  );
}

export default Forms;
