import React, { useState } from "react";
import { FaMoon, FaSun, FaUser, FaLock, FaCog } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const SettingsCard = () => {
  const [theme, setTheme] = useState("Light");

  const themeOptions = [
    { value: "Light", icon: <FaSun className="text-yellow-500" /> },
    { value: "Dark", icon: <FaMoon className="text-blue-500" /> },
  ];

  return (
    <div className="relative z-50 flex justify-end">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
        className="absolute right-0 mt-4 w-full bg-white dark:bg-gray-800 shadow-xl rounded-2xl border border-gray-300 dark:border-gray-700"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-gray-100 dark:bg-gray-900 border-b border-gray-300 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <FaCog className="text-blue-600 dark:text-blue-400" />
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Settings</h3>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 space-y-6">
          {/* Theme Selector */}
          <div>
            <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Theme</span>
            <div className="flex gap-3">
              {themeOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setTheme(option.value)}
                  className={`flex items-center justify-center w-full p-3 rounded-lg transition-all duration-200 text-sm font-medium border ${
                    theme === option.value
                      ? "bg-blue-500 text-white border-blue-600 shadow-md"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  <span className="text-lg mr-2">{option.icon}</span>
                  <span>{option.value}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4 pt-2">
            <Link
              to="/admin/dashboard/profile"
              className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg w-full font-medium"
            >
              <FaUser className="text-white text-sm" />
              <span>Edit Profile</span>
            </Link>

            <Link
              to="/admin/resetpassword"
              className="flex items-center justify-center space-x-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-3 px-4 rounded-xl transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-sm hover:shadow w-full font-medium"
            >
              <FaLock className="text-gray-500 dark:text-gray-400 text-sm" />
              <span>Change Password</span>
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-gray-50 dark:bg-gray-900 text-center text-xs text-gray-500 dark:text-gray-400 border-t border-gray-300 dark:border-gray-700">
          App Version 1.0.0
        </div>
      </motion.div>
    </div>
  );
};
