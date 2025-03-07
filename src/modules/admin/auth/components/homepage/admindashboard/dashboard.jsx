import React, { useState } from "react";
import { IoIosNotifications, IoMdSearch } from "react-icons/io";
import { FaChartPie, FaUsers, FaCog } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { ProfileCard } from "./profile/adminInformation";
import { Sidebar } from "../aside/aside";

export const AdminDashboard = () => {
  const [showProfile, setShowProfile] = useState(false);

  const dashboardStats = [
    { icon: <FaUsers className="text-blue-500 text-2xl" />, title: "Total Users", value: "1,254" },
    { icon: <FaChartPie className="text-green-500 text-2xl" />, title: "Revenue", value: "$45,230" },
    { icon: <FaCog className="text-purple-500 text-2xl" />, title: "Pending Tasks", value: "12" },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm p-4 flex items-center justify-between md:pr-6 relative">
          <div className="flex-1 max-w-md relative">
            <input
              type="text"
              placeholder="Search dashboard..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
            <IoMdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
          </div>

          {/* Notification & Profile Section */}
          <div className="flex items-center gap-6 ml-4">
            {/* Notifications */}
            <div className="relative cursor-pointer">
              <IoIosNotifications className="text-2xl text-gray-600 hover:text-blue-500" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </div>

            {/* Profile */}
            <div
              className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg"
              onClick={() => setShowProfile(!showProfile)}
            >
              <img
                src="https://via.placeholder.com/40"
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
              />
              <span className="text-gray-700 font-medium hidden sm:block">Admin</span>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {dashboardStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">{stat.icon}</div>
                  <div>
                    <p className="text-gray-500 text-sm font-medium">{stat.title}</p>
                    <h3 className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </main>
      </div>

      {/* Profile Card Overlay */}
      <AnimatePresence>
        {showProfile && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 right-4 z-50"
          >
            <div className="bg-white shadow-xl rounded-xl  w-80">
              <ProfileCard />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
