import React from "react";

const DashboardHeader = ({ isOnline, setIsOnline, earnings }) => {
  return (
    <div className="mb-6 p-4 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-semibold">Cook Dashboard</h2>
          <p className="text-sm text-gray-500">Welcome back, Chef!</p>
        </div>
        <button
          onClick={() => setIsOnline(!isOnline)}
          className={`px-4 py-2 rounded-full cursor-pointer font-medium ${
            isOnline ? "bg-[#426B1F] text-white" : "bg-gray-200 text-gray-700"
          }`}
        >
          {isOnline ? "Online" : "Go Online"}
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
