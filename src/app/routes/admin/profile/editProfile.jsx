import { MyProfile } from "@/modules/admin/editProfile/components/editProfile";
import React from "react";

export const MyProfileRoute = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Page Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

export default MyProfileRoute;