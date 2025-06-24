import { SlidersHorizontal, Building2, CopyCheck } from "lucide-react";
import IconDropdown from "./IconDropdown";

const departmentOptions = [
  { value: "", label: "Department" },
  { value: "CSE", label: "CSE" },
  { value: "ECE", label: "ECE" },
  { value: "EEE", label: "EEE" },
  { value: "EE", label: "EE" },
  { value: "ME", label: "ME" },
  { value: "AIML", label: "AIML" },
  { value: "CSBS", label: "CSBS" },
  { value: "BCA", label: "BCA" },
  { value: "MCA", label: "MCA" },
  { value: "IOT(CSBT)", label: "IOT(CSBT)" },
  { value: "CSE(AI)", label: "CSE(AI)" },
];

const statusOptions = [
  { value: "", label: "Form Status" },
  { value: "live", label: "Live" },
  { value: "closed", label: "Closed" },
  { value: "pending", label: "Pending" },
];

function Filters() {
  return (
    <div className="flex items-center gap-5 text-gray-700 bg-gray-100">
      {/* Filter label with icon */}
      <div className="flex items-center space-x-2">
        <SlidersHorizontal className="w-5 h-5" />
        <span className="text-md font-medium">Filter</span>
      </div>
      <IconDropdown icon={Building2} options={departmentOptions} />
      <IconDropdown icon={CopyCheck} options={statusOptions} />
    </div>
  );
}

export default Filters;
