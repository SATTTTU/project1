// pages/PaymentDashboard.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, CreditCard, Users } from "lucide-react";
import { Sidebar } from "@/components/ui/admin/aside/aside";

export const PaymentDashboardRoute = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex min-h-screen bg-gradient-to-r from-gray-100 to-gray-200">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 p-6 md:p-10 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center px-4 py-2 bg-white text-gray-700 text-sm font-medium rounded-lg shadow hover:shadow-md transition-transform transform hover:-translate-y-0.5 focus:outline-none  cursor-pointer focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
          >
            <ArrowLeft size={20} className="mr-2" /> Back
          </button>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-800 mt-4 md:mt-0">
            Payment Management Dashboard
          </h1>
        </div>
        
        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {/* User Payment Details */}
          <Link
            to="/admin/user-payments"
            className="flex flex-col justify-between p-6 md:p-8 bg-white shadow-lg rounded-2xl hover:shadow-xl transition-transform transform hover:-translate-y-1 border-l-8 border-blue-500 hover:bg-blue-50"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-700">User Payment Details</h2>
              <Users size={32} className="text-blue-600" />
            </div>
            <p className="text-gray-600 mt-3 text-base md:text-lg">
              View and manage all user transactions efficiently.
            </p>
          </Link>
          
          {/* Cook Payment Details */}
          <Link
            to="/admin/cook-payments"
            className="flex flex-col justify-between p-6 md:p-8 bg-white shadow-lg rounded-2xl hover:shadow-xl transition-transform transform hover:-translate-y-1 border-l-8 border-green-500 hover:bg-green-50"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-700">Cook Payment Details</h2>
              <CreditCard size={32} className="text-green-600" />
            </div>
            <p className="text-gray-600 mt-3 text-base md:text-lg">
              View and manage cook transactions seamlessly.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};