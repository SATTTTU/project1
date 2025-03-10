import CookNavBAr from "../../../../components/ui/cooknavbar/cooknavbar";
import { Sidebar } from "../../../../components/ui/sideBar/sidebar";
import React from "react";
import { useState } from "react";
import { FaCamera, FaUser } from "react-icons/fa";
export const cookProfile = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Sample user data
  const userData = {
    name: "Alka rai",
    email: "Ankit.sharma@example.com",
    phone: "+91 98765 43210",
    address: "123 Main Street, kathmandu",
    joinedDate: "January 2023",
    totalOrders: 156,
    rating: 4.8,
    specialties: ["newari", "tamang", "rai"],
  };

  return (
    <div className="flex h-screen flex-col">
      {/* Header */}
      <CookNavBAr />
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <main className="flex-1 overflow-auto p-4 md:p-6 bg-gray-50">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Profile</h1>
            <p className="text-sm text-gray-500">
              Manage your personal information
            </p>
          </div>

          {/* Profile Card */}
          <div className="mb-8 rounded-lg bg-white p-6 shadow-sm">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="h-32 w-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    <img
                      src="/placeholder.svg?height=128&width=128"
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <button className="absolute bottom-0 right-0 rounded-full bg-[#426B1F] p-2 text-white shadow-sm">
                    <FaCamera className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-4 text-center">
                  <h2 className="text-xl font-bold">{userData.name}</h2>
                  <p className="text-sm text-gray-500">
                    Cook since {userData.joinedDate}
                  </p>
                  <div className="mt-2 flex items-center justify-center">
                    <div className="flex items-center">
                      <span className="text-yellow-400">★</span>
                      <span className="ml-1 font-medium">
                        {userData.rating}
                      </span>
                    </div>
                    <span className="mx-2 text-gray-300">•</span>
                    <span className="text-sm text-gray-500">
                      {userData.totalOrders} orders
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex-1 space-y-6">
                <div>
                  <h3 className="text-lg font-medium">Personal Information</h3>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-500">
                        Full Name
                      </label>
                      <input
                        type="text"
                        defaultValue={userData.name}
                        className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-[#426B1F] focus:outline-none focus:ring-1 focus:ring-[#426B1F]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">
                        Email
                      </label>
                      <input
                        type="email"
                        defaultValue={userData.email}
                        className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-[#426B1F] focus:outline-none focus:ring-1 focus:ring-[#426B1F]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        defaultValue={userData.phone}
                        className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-[#426B1F] focus:outline-none focus:ring-1 focus:ring-[#426B1F]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">
                        Address
                      </label>
                      <input
                        type="text"
                        defaultValue={userData.address}
                        className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-[#426B1F] focus:outline-none focus:ring-1 focus:ring-[#426B1F]"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium">Specialties</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {userData.specialties.map((specialty, index) => (
                      <span
                        key={index}
                        className="inline-flex rounded-full bg-[#426B1F]/10 px-3 py-1 text-sm font-medium text-[#426B1F]"
                      >
                        {specialty}
                      </span>
                    ))}
                    <button className="inline-flex rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
                      + Add More
                    </button>
                  </div>
                </div>

                <div className="pt-4">
                  <button className="rounded-md bg-[#426B1F] px-4 py-2 text-white hover:bg-[#365818]">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Settings */}
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="text-lg font-medium">Account Settings</h3>
            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between py-2">
                <div>
                  <h4 className="font-medium">Notifications</h4>
                  <p className="text-sm text-gray-500">
                    Receive order and promotional notifications
                  </p>
                </div>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="peer sr-only"
                  />
                  <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#426B1F] peer-checked:after:translate-x-full"></div>
                </label>
              </div>
              <div className="flex items-center justify-between py-2">
                <label className="relative inline-flex cursor-pointer items-center">
                  <input type="checkbox" className="peer sr-only" />
                  <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#426B1F] peer-checked:after:translate-x-full"></div>
                </label>
              </div>
              <div className="border-t pt-4">
                <button className="text-red-600 hover:text-red-800">
                  Deactivate Account
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
