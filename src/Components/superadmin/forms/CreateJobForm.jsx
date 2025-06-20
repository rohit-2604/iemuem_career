import { useRef } from "react";
import {
  Edit,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  List,
  ListOrdered,
  Calendar,
  MapPin,
  IndianRupee,
  Clock,
  SendHorizontal,
  WalletMinimal,
  BriefcaseBusiness,
} from "lucide-react";

export default function CreateJobForm() {
  const jobDescRef = useRef(null);
  const respRef = useRef(null);

  const execCmd = (cmd, value = null, ref = jobDescRef) => {
    if (ref.current) {
      ref.current.focus();
      document.execCommand(cmd, false, value);
    }
  };

  const formatToolbar = (ref) => (
    <div className="flex items-center gap-1 p-2 border-t">
      <button
        onClick={() => execCmd("justifyLeft", null, ref)}
        className="h-8 w-8 hover:bg-gray-200 rounded"
      >
        <AlignLeft className="h-4 w-4" />
      </button>
      <button
        onClick={() => execCmd("justifyCenter", null, ref)}
        className="h-8 w-8 hover:bg-gray-200 rounded"
      >
        <AlignCenter className="h-4 w-4" />
      </button>
      <button
        onClick={() => execCmd("justifyRight", null, ref)}
        className="h-8 w-8 hover:bg-gray-200 rounded"
      >
        <AlignRight className="h-4 w-4" />
      </button>
      <div className="w-px h-4 bg-gray-300 mx-1" />
      <button
        onClick={() => execCmd("bold", null, ref)}
        className="h-8 w-8 hover:bg-gray-200 rounded"
      >
        <Bold className="h-4 w-4" />
      </button>
      <button
        onClick={() => execCmd("italic", null, ref)}
        className="h-8 w-8 hover:bg-gray-200 rounded"
      >
        <Italic className="h-4 w-4" />
      </button>
      <div className="w-px h-4 bg-gray-300 mx-1" />
      <button
        onClick={() => execCmd("insertUnorderedList", null, ref)}
        className="h-8 w-8 hover:bg-gray-200 rounded"
      >
        <List className="h-4 w-4" />
      </button>
      <button
        onClick={() => execCmd("insertOrderedList", null, ref)}
        className="h-8 w-8 hover:bg-gray-200 rounded"
      >
        <ListOrdered className="h-4 w-4" />
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg">
            <span className="text-sm font-medium">Job Hiring Form Name</span>
            <Edit className="h-4 w-4" />
          </div>
          <button className="bg-[#367aff] hover:bg-blue-600 text-white px-6 py-2 rounded flex items-center justify-center gap-2">
            <span>Publish Form</span>
            <SendHorizontal className="h-4 w-4" />
          </button>
        </div>

        {/* Job Details */}
        <div className="bg-white shadow rounded p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 bg-black rounded-full" />
            <h2 className="text-lg font-semibold">Job Details</h2>
            <Edit className="h-4 w-4 text-gray-500" />
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Description
            </label>
            <div
              ref={jobDescRef}
              contentEditable
              className="w-full border rounded p-2 min-h-[120px] bg-white"
              suppressContentEditableWarning
            />
            {formatToolbar(jobDescRef)}
          </div>

          {/* Responsibilities */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Responsibilities
            </label>
            <div
              ref={respRef}
              contentEditable
              className="w-full border rounded p-2 min-h-[120px] bg-white"
              suppressContentEditableWarning
            />
            {formatToolbar(respRef)}
          </div>

          {/* Form Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-2">
                <IndianRupee className="h-4 w-4 text-blue-500" />
                Salary:
              </label>
              <input className="w-full border rounded p-2" />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-2">
                <Clock className="h-4 w-4 text-blue-500" />
                Job Duration:
              </label>
              <select className="w-full border rounded p-2">
                <option value="full-time">Full Time</option>
                <option value="part-time">Part Time</option>
                <option value="contract">Contract</option>
              </select>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-2">
                <MapPin className="h-4 w-4 text-blue-500" />
                Job Location:
              </label>
              <select className="w-full border rounded p-2">
                <option value="remote">Remote</option>
                <option value="onsite">On-site</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-2">
                
                <WalletMinimal   className="h-4 w-4 text-blue-500" />
                Experience:
              </label>
              <select className="w-full border rounded p-2">
                <option value="entry">Entry Level</option>
                <option value="mid">Mid Level</option>
                <option value="senior">Senior Level</option>
              </select>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-2">
                <Calendar className="h-4 w-4 text-blue-500" />
                Job Posted:
              </label>
              <input type="date" className="w-full border rounded p-2" />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-2">
                <BriefcaseBusiness  className="h-4 w-4 text-blue-500" />
                
                Education:
              </label>
              <div className="flex flex-wrap gap-2">
                {["Bachelor's", "Master's", "Ph.D"].map((edu) => (
                  <span
                    key={edu}
                    className="bg-blue-900 text-white text-xs px-2 py-1 rounded"
                  >
                    {edu}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Button */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button className="bg-[#367aff] hover:bg-blue-600 justify-center text-white px-8 py-2 rounded">
            Create Recruitment Form
          </button>
        </div>
      </div>
    </div>
  );
}
