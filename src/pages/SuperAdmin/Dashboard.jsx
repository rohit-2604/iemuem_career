import { useState } from "react";
import { BellDot, Search } from "lucide-react";
import DepartmentSection from "../../Components/superadmin/dashboard/DepartmentSection";
import RecruitmentFormsSection from "../../Components/superadmin/dashboard/RecruitmentFormsSection";
import DepartmentHiringChart from "../../Components/superadmin/dashboard/DepartmentHiringChart";
import HiringFormDetails from "../../Components/superadmin/dashboard/HiringFormDetails";
import HiringStatusTable from "../../Components/superadmin/dashboard/HiringStatusTable";
import HiringStatistics from "../../Components/superadmin/dashboard/HiringStatistics";
import SearchBar from "../../Components/common/SearchBar";

export default function Dashboard() {

  return (
    <div className="flex min-h-screen font-inter">
      {/* Main Content */}
      <div className="flex-1 bg-[#f3f4f6]">
        {/* Main Grid */}
        <div className="grid grid-cols-[330px_1fr] h-full">
          {/* Left Column */}
          <div className="space-y-6 bg-[#f3f4f6] overflow-hidden p-6">
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
                  timeZone: "Asia/Kolkata",
                })}
              </p>
            </div>

            <DepartmentSection />
            <RecruitmentFormsSection />
            <DepartmentHiringChart />
          </div>

          {/* Right Column */}
          <div className="h-full overflow-y-auto bg-white p-6 space-y-6">
            {/* Search + Notification */}
            <div className="flex justify-end items-center">
              <div className="flex items-center gap-4">
                <SearchBar onSearch={()=>{}}/>
                <button className="relative border border-gray-300 p-2 rounded-full bg-white hover:bg-gray-100 transition shadow-sm">
                  <BellDot className="text-[#515157]" />
                  <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500 shadow-md" />
                </button>
              </div>
            </div>

            {/* Main Dashboard Content */}
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
