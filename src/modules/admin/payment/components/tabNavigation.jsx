import React from "react";

const TabNavigation = ({ activeTab, setActiveTab }) => {
  return (
    <div className="mt-6 border-b">
      <nav className="flex space-x-8">
        <button 
          className={`pb-4 text-sm font-medium ${activeTab === "gateways" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}
          onClick={() => setActiveTab("gateways")}
        >
          Payment Gateways
        </button>
        <button 
          className={`pb-4 text-sm font-medium ${activeTab === "settings" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}
          onClick={() => setActiveTab("settings")}
        >
          Global Settings
        </button>
        <button 
          className={`pb-4 text-sm font-medium ${activeTab === "security" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}
          onClick={() => setActiveTab("security")}
        >
          Security
        </button>
      </nav>
    </div>
  );
};

export default TabNavigation;
