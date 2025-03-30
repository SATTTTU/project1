import React from "react";
import { UseSetCookStatus } from "../api/availableStatus"; // Import the custom hook

const DashboardHeader = ({ isOnline, setIsOnline, earnings }) => {
  // Use the custom hook to set the cook's availability status
  const { mutate: setCookStatus, isLoading, isError } = UseSetCookStatus(); // 'mutate' should be renamed to 'setCookStatus'

  // Function to handle the button click and update cook's status
  const handleToggleStatus = () => {
    // Toggle the status between available and busy (online or offline)
    const newStatus = !isOnline;
    setIsOnline(newStatus);  // Update the local state
    
    // Call the mutation to update the status in the backend
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
          disabled={isLoading} // Disable button while API is loading
        >
          {isOnline ? "Available" : "Go Online"}
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-green-50 p-4 rounded-lg border border-green-100">
          <p className="text-sm text-gray-600">Today's Earnings</p>
          <h3 className="text-xl font-bold">₹{earnings.today}</h3>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <p className="text-sm text-gray-600">This Week</p>
          <h3 className="text-xl font-bold">₹{earnings.thisWeek}</h3>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
          <p className="text-sm text-gray-600">This Month</p>
          <h3 className="text-xl font-bold">₹{earnings.thisMonth}</h3>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
          <p className="text-sm text-gray-600">Pending Payout</p>
          <h3 className="text-xl font-bold">₹{earnings.pendingPayout}</h3>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
