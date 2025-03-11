import React from "react";

const StatusBanner = ({ userData }) => {
  return (
    <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center justify-between">
      <div className="flex items-center">
        <div className="h-3 w-3 bg-green-500 rounded-full mr-2"></div>
        <span className="font-medium text-green-800">
          {userData.availabilityStatus}
        </span>
      </div>
      <button className="text-sm text-green-700 hover:text-green-900 underline">
        Change Status
      </button>
    </div>
  );
};

export default StatusBanner;
