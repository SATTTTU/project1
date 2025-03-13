import React, { useState } from "react";
import { CreditCard, Bell } from "lucide-react";
import { Sidebar } from "@/components/ui/admin/aside/aside";
import PaymentSummary from "@/modules/admin/payment/components/paymentSummary";
import PaymentGatewayCard from "@/modules/admin/payment/components/paymentgateway";
import TabNavigation from "@/modules/admin/payment/components/tabNavigation";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
export const PaymentSettingsRoute = () => {
  const [activeTab, setActiveTab] = useState("gateways");

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
          <Link to="/admin/dashboard"
                          className="mr-2 p-1 rounded-full hover:bg-gray-100 text-gray-500 cursor-pointer"
                        >
                          <FaArrowLeft size={20} />
                        </Link>
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
        </div>

        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="p-6">
          <div className="mb-6 bg-white p-4 rounded-md shadow-sm">
            <div className="flex items-center">
              <Bell size={20} className="text-yellow-500 mr-2" />
              <p className="text-sm text-gray-700">
                Khalti Gateway requires configuration update to comply with new security protocols.{" "}
                <a href="#" className="text-blue-600 hover:underline">Configure now</a>
              </p>
            </div>
          </div>

          <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
            {paymentOptions.map((option, index) => (
              <PaymentGatewayCard key={index} option={option} />
            ))}
          </div>

          <PaymentSummary />
        </div>
      </div>
    </section>
  );
};
