import React, { useState } from "react";
import { CreditCard, Settings, ChevronRight, Bell, Shield } from "lucide-react";
import { Sidebar } from "../../homepage/aside/aside";

export const PaymentSettings = () => {
  const [activeTab, setActiveTab] = useState("gateways");
  
  // Payment Options Data
  const paymentOptions = [
    {
      name: "eSewa",
      description: "Nepal's leading digital wallet and online payment solution.",
      color: "bg-green-500",
      status: "Active",
      icon: <CreditCard size={24} />,
      lastUpdated: "Mar 5, 2025"
    },
    {
      name: "IME Pay",
      description: "Secure mobile wallet for instant payments and transfers.",
      color: "bg-red-500",
      status: "Active",
      icon: <CreditCard size={24} />,
      lastUpdated: "Mar 2, 2025"
    },
    {
      name: "Khalti",
      description: "Digital wallet and payment gateway for businesses.",
      color: "bg-purple-600",
      status: "Inactive",
      icon: <CreditCard size={24} />,
      lastUpdated: "Feb 28, 2025"
    },
    {
      name: "ConnectIPS",
      description: "Direct bank account integration for payments.",
      color: "bg-blue-600",
      status: "Configuration Required",
      icon: <CreditCard size={24} />,
      lastUpdated: "Not configured"
    }
  ];

  return (
    <section className="flex h-screen bg-gray-100">
      <div className="md:w-1/5 bg-white shadow-md">
        <Sidebar />
      </div>

      <div className="md:w-4/5 overflow-auto">
        <div className="bg-white p-6 border-b">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-800">Payment Gateway Management</h1>
            <div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 mr-2">
                Add New Gateway
              </button>
              <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-300">
                View Transaction Logs
              </button>
            </div>
          </div>
          
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
        </div>
        
        <div className="p-6">
          <div className="mb-6 bg-white p-4 rounded-md shadow-sm">
            <div className="flex items-center">
              <Bell size={20} className="text-yellow-500 mr-2" />
              <p className="text-sm text-gray-700">
                Khalti Gateway requires configuration update to comply with new security protocols. <a href="#" className="text-blue-600 hover:underline">Configure now</a>
              </p>
            </div>
          </div>
          
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
            {paymentOptions.map((option, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
                <div className={`h-2 ${option.color}`}></div>
                <div className="p-5">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center">
                      <div className={`${option.color} p-2 rounded-md text-white mr-3`}>
                        {option.icon}
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold text-gray-800">{option.name}</h2>
                        <p className="text-sm text-gray-600">{option.description}</p>
                      </div>
                    </div>
                    <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
                      option.status === "Active" ? "bg-green-100 text-green-800" : 
                      option.status === "Inactive" ? "bg-red-100 text-red-800" : 
                      "bg-yellow-100 text-yellow-800"
                    }`}>
                      {option.status}
                    </span>
                  </div>
                  
                  <div className="mt-4 flex items-center text-xs text-gray-500">
                    <Shield size={14} className="mr-1" />
                    <span>Last updated: {option.lastUpdated}</span>
                  </div>
                  
                  <div className="mt-4 flex justify-between pt-4 border-t">
                    <button className="text-sm text-gray-600 hover:text-gray-800 flex items-center">
                      <Settings size={16} className="mr-1" />
                      Configure
                    </button>
                    <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
                      View Details
                      <ChevronRight size={16} className="ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 bg-white p-5 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Payment Processing Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-sm text-gray-500">Active Gateways</p>
                <p className="text-2xl font-semibold text-gray-800">2/4</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-sm text-gray-500">Success Rate (30d)</p>
                <p className="text-2xl font-semibold text-gray-800">98.2%</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-sm text-gray-500">Avg. Processing Time</p>
                <p className="text-2xl font-semibold text-gray-800">1.8s</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};