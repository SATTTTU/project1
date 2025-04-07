import React from "react";
import { UseSetCookStatus } from "../api/availableStatus"; // Import the custom hook
import { useAllTimeEarnings } from "../api/alltimeEarnings";
import { useWeeklyEarnings } from "../api/weeklyEarnings";
import { useDailyEarnings } from "../api/dailyEarnings";
import { usePendingPayout } from "../api/pendingpayout";

const DashboardHeader = ({ isOnline, setIsOnline}) => {
  const { mutate: setCookStatus, isLoading} = UseSetCookStatus(); // 'mutate' should be renamed to 'setCookStatus'
const {data}= useAllTimeEarnings();
console.log("earning****", data);
const {data:weeklyearnings}= useWeeklyEarnings();
const {data:dailyearnings}= useDailyEarnings();
const {data:pending} = usePendingPayout();


  // Function to handle the button click and update cook's status
  const handleToggleStatus = () => {
    const newStatus = !isOnline;
    setIsOnline(newStatus);  // Update the local state
    
    setCookStatus({ available_status: newStatus ? "online" : "busy" }); // Pass the status correctly
  };

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
          disabled={isLoading} 
        >
          {isOnline ? "Available" : "Go Online"}
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
