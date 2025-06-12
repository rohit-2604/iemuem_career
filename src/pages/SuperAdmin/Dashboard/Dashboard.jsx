import { useState } from "react";
import { BellDot, Search, Menu } from "lucide-react";
import Sidebar from "./Sidebar";
import DepartmentSection from "./DepartmentSection";
import RecruitmentFormsSection from "./RecruitmentFormsSection";
import DepartmentHiringChart from "./DepartmentHiringChart";
import HiringFormDetails from "./HiringFormDetails";
import HiringStatusTable from "./HiringStatusTable";
import HiringStatistics from "./HiringStatistics";

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen font-inter">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 bg-[#f3f4f6]">
        {/* Toggle Sidebar Button (mobile or top-left for desktop) */}
        <button
          className="m-4 p-2 bg-white rounded-md shadow lg:hidden"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu />
        </button>

        {/* Main Grid */}
        <div className="grid grid-cols-[320px_1fr] h-screen">
          {/* Left Column (fixed) */}
          <div className="space-y-6 bg-[#f3f4f6] h-full overflow-hidden p-6">
            <div>
              <h1 className="text-xl font-bold text-gray-800">
                Super Admin Dashboard
              </h1>
              <p className="text-sm text-gray-500">
                {new Date().toLocaleString("en-IN", {
                  weekday: "short",
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </p>
            </div>

            <DepartmentSection />
            <RecruitmentFormsSection />
            <DepartmentHiringChart />
          </div>

          {/* Right Column (scrollable) */}
          <div className="h-full overflow-y-auto bg-white p-6 space-y-6">
            {/* Search + Notification */}
            <div className="flex justify-end items-center">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                  <input
                    type="search"
                    placeholder="Search here"
                    className="w-[280px] pl-8 pr-2 py-2 border border-gray-300 rounded-md bg-white shadow-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <button className="relative border border-gray-300 p-2 rounded-full bg-white hover:bg-gray-100 transition shadow-sm">
                  <BellDot className="text-[#515157]" />
                  <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500 shadow-md" />
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div className="bg-white rounded-lg shadow">
              <HiringFormDetails />
            </div>
            <div className="bg-white rounded-lg shadow">
              <HiringStatusTable />
            </div>
            <div className="bg-white rounded-lg shadow">
              <HiringStatistics />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
