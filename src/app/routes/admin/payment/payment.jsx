// pages/PaymentDashboard.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, CreditCard, Users } from "lucide-react";
import { Sidebar } from "@/components/ui/admin/aside/aside";
import { FaArrowLeft } from "react-icons/fa";

export const PaymentDashboardRoute = () => {
  const navigate=useNavigate()
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
         <button
                 onClick={() => navigate(-1)}
                 className="flex items-center px-3 py-2 mb-4 bg-gray-200 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
               >
                 <ArrowLeft size={16} className="mr-1" /> Back
               </button>
          <h1 className="text-4xl font-bold text-gray-800">Payment Management Dashboard</h1>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* User Payment Details */}
          <Link
            to="/admin/user-payments"
            className="flex flex-col justify-between p-8 bg-white shadow-md rounded-xl hover:shadow-lg transition-transform transform hover:-translate-y-1 border-l-8 border-blue-500"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-gray-700">User Payment Details</h2>
              <Users size={28} className="text-blue-600" />
            </div>
            <p className="text-gray-600 mt-2 text-lg">
              View and manage all user transactions efficiently.
            </p>
          </Link>

          {/* Cook Payment Details */}
          <Link
            to="/admin/cook-payments"
            className="flex flex-col justify-between p-8 bg-white shadow-md rounded-xl hover:shadow-lg transition-transform transform hover:-translate-y-1 border-l-8 border-green-500"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-gray-700">Cook Payment Details</h2>
              <CreditCard size={28} className="text-green-600" />
            </div>
            <p className="text-gray-600 mt-2 text-lg">
              View and manage cook transactions seamlessly.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};
