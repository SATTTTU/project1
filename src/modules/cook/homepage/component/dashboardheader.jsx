import React, { useEffect, useState } from "react";
import { UseSetCookStatus } from "../api/availableStatus";
import { useAllTimeEarnings } from "../api/alltimeEarnings";
import { useWeeklyEarnings } from "../api/weeklyEarnings";
import { useDailyEarnings } from "../api/dailyEarnings";
import { usePendingPayout } from "../api/pendingpayout";
// import { useGetCookStatus } from "../api/getCookStatus";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom"; // Assuming cookId is in URL params
import { useGetCookStatus } from "@/modules/user/cooks/api/getCookStatus";

const DashboardHeader = () => {
  const { id: cookId } = useParams(); // Or use your auth context if cookId is stored there

  const [isOnline, setIsOnline] = useState(false);

  const { mutate: setCookStatus, isLoading: statusLoading } = UseSetCookStatus();
  const { data: cookStatusData, isLoading: statusFetching } = useGetCookStatus(cookId);
  const { data } = useAllTimeEarnings();
  const { data: weeklyearnings } = useWeeklyEarnings();
  const { data: dailyearnings } = useDailyEarnings();
  const { data: pending } = usePendingPayout();

  // Set initial status from backend when component mounts
  useEffect(() => {
    if (cookStatusData) {
      setIsOnline(cookStatusData.available_status === "online");
    }
  }, [cookStatusData]);

  const handleToggleStatus = async () => {
    const newStatus = !isOnline;
    setIsOnline(newStatus); // Optimistically update UI

    try {
      await setCookStatus({ available_status: newStatus ? "online" : "offline" });
      toast.success(`Status updated to ${newStatus ? "Online" : "Offline"}`, {
        position: "bottom-right",
        autoClose: 2000,
      });
    } catch (error) {
      toast.error("Failed to update status. Please try again.", {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
  };

  if (statusFetching) return <p className="text-gray-500">Loading status...</p>;

  return (
    <div className="mb-6 p-4 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-semibold">Cook Dashboard</h2>
          <p className="text-sm text-gray-500">Welcome back, Chef!</p>
        </div>
        <button
          onClick={handleToggleStatus}
          className={`px-4 py-2 rounded-full cursor-pointer font-medium ${
            isOnline ? "bg-[#426B1F] text-white" : "bg-gray-200 text-gray-700"
          }`}
          disabled={statusLoading}
        >
          {statusLoading ? "Updating..." : isOnline ? "Go Offline" : "Go Online"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-green-50 p-4 rounded-lg border border-green-100">
          <p className="text-sm text-gray-600">Today's Earnings</p>
          <h3 className="text-xl font-bold">Rs. {dailyearnings}</h3>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <p className="text-sm text-gray-600">This Week</p>
          <h3 className="text-xl font-bold">Rs. {weeklyearnings}</h3>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
          <p className="text-sm text-gray-600">Total's Earnings</p>
          <h3 className="text-xl font-bold">Rs. {data?.total_balance}</h3>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
          <p className="text-sm text-gray-600">Pending Payout</p>
          <h3 className="text-xl font-bold">Rs. {pending}</h3>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
