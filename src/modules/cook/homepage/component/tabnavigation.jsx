import React from "react";

const TabNavigation = ({ activeTab, setActiveTab }) => {
  return (
    <div className="mb-6">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex">
          <button
            className={`py-4 px-6 font-medium text-sm ${
              activeTab === "orders"
                ? "border-b-2 border-[#426B1F] text-[#426B1F]"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("orders")}
          >
            Order Management
          </button>
          <button
            className={`py-4 px-6 font-medium text-sm ${
              activeTab === "menu"
                ? "border-b-2 border-[#426B1F] text-[#426B1F]"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("menu")}
          >
            Your Menu
          </button>
          {/* <button
            className={`py-4 px-6 font-medium text-sm ${
              activeTab === "insights"
                ? "border-b-2 border-[#426B1F] text-[#426B1F]"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("insights")}
          >
            Insights & Analytics
          </button> */}
        </nav>
      </div>
    </div>
  );
};

export default TabNavigation;
