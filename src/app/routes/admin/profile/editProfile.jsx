import { MyProfile } from "@/modules/admin/editProfile/components/editProfile";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Navigate, useNavigate } from "react-router-dom";

export const MyProfileRoute = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Page Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
         <button
                  className="mr-2 p-1 rounded-full hover:bg-gray-100 text-gray-500 cursor-pointer"
                  onClick={()=>navigate("/admin/dashboard")}
                >
                  <FaArrowLeft size={16} />
                </button>
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">User Profile</h1>
          <p className="mt-1 text-sm text-gray-500">Manage your account information and settings</p>
        </div>
        
        {/* Profile Component */}
        <MyProfile />
      </div>
    </div>
  );
};
