import { MyProfile } from "@/modules/admin/editProfile/components/editProfile";
import { ArrowLeft } from "lucide-react";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Navigate, useNavigate } from "react-router-dom";

export const MyProfileRoute = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Page Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between px-4">
      <button
        className="inline-flex items-center h-8 px-3 py-1 text-gray-700 text-xs font-medium rounded-lg shadow hover:shadow-md transition-transform transform hover:-translate-y-0.5 focus:outline-none cursor-pointer focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 w-fit"
        onClick={() => navigate("/admin/dashboard")}
      >
        <ArrowLeft size={14} className="mr-1" /> Back
      </button>
      
      {/* Page Header - Centered */}
      <div className="flex-grow text-center">
        <h1 className="text-2xl font-bold text-gray-900">User Profile</h1>
        <p className="text-sm text-gray-500">Manage your account information and settings</p>
      </div>
      
      {/* Empty div for balance */}
      <div className="w-16"></div>
    </div>
        {/* Profile Component */}
        <div className="p-2"></div>
        <MyProfile />
      </div>
    </div>
  );
};
