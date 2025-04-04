// pages/PaymentDashboard.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, CreditCard, Users } from "lucide-react";
import { Sidebar } from "@/components/ui/admin/aside/aside";

export const PaymentDashboardRoute = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 p-6 md:p-10 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center px-4 py-2 bg-white text-gray-700 text-sm font-medium rounded-lg shadow hover:shadow-md transition-transform transform hover:-translate-y-0.5 focus:outline-none cursor-pointer focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 w-fit"
      >
        <ArrowLeft size={16} className="mr-2" /> Back
      </button>
      <h1 className="text-xl sm:text-2xl lg:text-4xl font-extrabold text-gray-800">
        Payment Management Dashboard
      </h1>
    </div>
        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
  {/* User Payment Details */}
  <Link
    to="/admin/user-payments"
    className="flex flex-col justify-between p-4 md:p-5 bg-white shadow-md rounded-xl hover:shadow-lg transition-transform transform hover:-translate-y-1 border-l-4 border-blue-500 hover:bg-blue-50"
  >
    <div className="flex items-center justify-between mb-2">
      <h2 className="text-xl md:text-2xl font-semibold text-gray-700">User Payment Details</h2>
      <Users size={24} className="text-blue-600" />
    </div>
    <p className="text-gray-600 mt-2 text-sm md:text-base">
      View and manage all user transactions efficiently.
    </p>
  </Link>
  
  {/* Cook Payment Details */}
  <Link
    to="/admin/cook-payments"
    className="flex flex-col justify-between p-4 md:p-5 bg-white shadow-md rounded-xl hover:shadow-lg transition-transform transform hover:-translate-y-1 border-l-4 border-green-500 hover:bg-green-50"
  >
    <div className="flex items-center justify-between mb-2">
      <h2 className="text-xl md:text-2xl font-semibold text-gray-700">Cook Payment Details</h2>
      <CreditCard size={24} className="text-green-600" />
    </div>
    <p className="text-gray-600 mt-2 text-sm md:text-base">
      View and manage cook transactions seamlessly.
    </p>
  </Link>
</div>
      </div>
    </div>
  );
};