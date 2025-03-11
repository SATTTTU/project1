import React from "react";

const WeeklyPerformance = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h3 className="font-medium mb-3">Weekly Performance</h3>
      <div className="h-48 flex items-end justify-between p-2">
        {/* Simple bar chart visualization */}
        <div className="flex flex-col items-center">
          <div
            className="w-8 bg-green-200 rounded-t-sm"
            style={{ height: "60%" }}
          ></div>
          <span className="text-xs mt-1">Mon</span>
        </div>
        <div className="flex flex-col items-center">
          <div
            className="w-8 bg-green-300 rounded-t-sm"
            style={{ height: "80%" }}
          ></div>
          <span className="text-xs mt-1">Tue</span>
        </div>
        <div className="flex flex-col items-center">
          <div
            className="w-8 bg-green-400 rounded-t-sm"
            style={{ height: "70%" }}
          ></div>
          <span className="text-xs mt-1">Wed</span>
        </div>
        <div className="flex flex-col items-center">
          <div
            className="w-8 bg-green-500 rounded-t-sm"
            style={{ height: "90%" }}
          ></div>
          <span className="text-xs mt-1">Thu</span>
        </div>
        <div className="flex flex-col items-center">
          <div
            className="w-8 bg-green-600 rounded-t-sm"
            style={{ height: "100%" }}
          ></div>
          <span className="text-xs mt-1">Fri</span>
        </div>
        <div className="flex flex-col items-center">
          <div
            className="w-8 bg-green-700 rounded-t-sm"
            style={{ height: "95%" }}
          ></div>
          <span className="text-xs mt-1">Sat</span>
        </div>
        <div className="flex flex-col items-center">
          <div
            className="w-8 bg-green-800 rounded-t-sm"
            style={{ height: "75%" }}
          ></div>
          <span className="text-xs mt-1">Sun</span>
        </div>
      </div>
    </div>
  );
};

export default WeeklyPerformance;
