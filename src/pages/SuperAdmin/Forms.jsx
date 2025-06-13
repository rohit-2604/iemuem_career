import { Plus } from "lucide-react";
import Filters from "../../Components/superadmin/forms/Filters";
import CreateFormButton from "../../Components/superadmin/forms/CreateFormButton";

function Forms() {
  return (
    <div className="flex min-h-screen font-inter">
      {/* Main Content */}
      <div className="flex-1 bg-[#f3f4f6]">
        {/* search, filters and create form */}
        <div className="flex justify-between items-center p-6 gap-4">
          <div className="flex-1">Search box</div>
          <div className="flex-1">
            <Filters />
          </div>
          <div className="flex-1">
            <CreateFormButton label="Create New Form" onClick={() => {}} />
          </div>
        </div>
        {/*  search results */}
        <div></div>
        {/* forms draft */}
        <div></div>
      </div>
    </div>
  );
}

export default Forms;
