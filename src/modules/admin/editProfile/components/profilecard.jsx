import React, { useState } from "react";
import { FaUser, FaCog, FaSignOutAlt, FaBell, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { SettingsCard } from "./settings";

export const ProfileCard = () => {
  const [notificationsAllowed, setNotificationsAllowed] = useState(true);
  const [showSettings, setShowSettings] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="w-72 bg-white shadow-2xl rounded-3xl border-2 border-gray-100 overflow-hidden relative"
    >
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-green-500 to-green-700 text-white p-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img
              src="/api/placeholder/80/80"
              alt="Profile"
              className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
            />
            <span className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></span>
          </div>
          <div>
            <h2 className="text-xl font-bold">Your Name</h2>
            <p className="text-sm opacity-80">yourname@gmail.com</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="p-4">
        <nav className="space-y-2">
          <Link 
            to='/admin/dashboard/profile' 
            className="group flex items-center justify-between px-4 py-3 hover:bg-green-50 rounded-lg transition-colors"
          >
            <div className="flex items-center space-x-3">
              <FaUser className="text-gray-500 group-hover:text-green-600 transition-colors" />
              <span className="text-gray-700 group-hover:text-green-600 transition-colors">
                My Profile
              </span>
            </div>
          </Link>

          {/* Toggle Settings View */}
          <div 
            onClick={() => setShowSettings(true)} 
            className="group flex items-center justify-between px-4 py-3 hover:bg-green-50 rounded-lg transition-colors cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <FaCog className="text-gray-500 group-hover:text-green-600 transition-colors" />
              <span className="text-gray-700 group-hover:text-green-600 transition-colors">
                Settings
              </span>
            </div>
          </div>

          <div className="group flex items-center justify-between px-4 py-3 hover:bg-green-50 rounded-lg transition-colors">
            <div className="flex items-center space-x-3">
              <FaBell className="text-gray-500 group-hover:text-green-600 transition-colors" />
              <span className="text-gray-700 group-hover:text-green-600 transition-colors">
                Notifications
              </span>
            </div>
            <div 
              onClick={() => setNotificationsAllowed(!notificationsAllowed)}
              className={`px-2 py-1 rounded-full text-xs font-semibold cursor-pointer transition-colors ${
                notificationsAllowed 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-red-100 text-red-700'
              }`}
            >
              {notificationsAllowed ? "Allowed" : "Blocked"}
            </div>
          </div>
        </nav>

        {/* Logout Button */}
        <div className="mt-4 pt-4 border-t">
          <button 
            className="w-full flex items-center justify-center text-red-500 hover:bg-red-50 py-3 rounded-lg transition-colors group"
          >
            <FaSignOutAlt className="mr-2 group-hover:rotate-6 transition-transform" />
            Log Out
          </button>
        </div>
      </div>

      {/* Show Settings Card if clicked */}
      {showSettings && (
        <div className="absolute top-0 left-0 w-full h-full bg-white shadow-lg rounded-3xl p-4 ">
          <button
            onClick={() => setShowSettings(false)}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <FaTimes className="text-xl" />
          </button>
          <SettingsCard onClose={() => setShowSettings(false)} />
        </div>
      )}
    </motion.div>
  );
};
