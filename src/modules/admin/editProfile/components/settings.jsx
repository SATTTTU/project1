import React, { useState } from "react";
import { FaMoon, FaSun, FaUser, FaLock, FaCog, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const SettingsCard = ({ onClose }) => {
  const [theme, setTheme] = useState("Light");
  
  const themeOptions = [
    { value: "Light", icon: <FaSun className="text-amber-500" /> },
    { value: "Dark", icon: <FaMoon className="text-indigo-600" /> }
  ];
  
  return (
    <div className="relative z-10">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
        className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700"
      >
        {/* Header with close button */}
        <div className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <FaCog className="text-gray-600 dark:text-gray-300" />
            <h3 className="font-medium text-gray-800 dark:text-gray-200">Settings</h3>
          </div>
          {onClose && (
            <button 
              onClick={onClose}
              className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
            >
              <FaTimes size={14} />
            </button>
          )}
        </div>
        
        {/* Card body */}
        <div className="p-4">
          {/* Theme selector */}
          <div className="mb-5">
            <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Theme</span>
            <div className="grid grid-cols-2 gap-3">
              {themeOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setTheme(option.value)}
                  className={`flex items-center justify-center space-x-2 p-2 rounded-lg transition-all ${
                    theme === option.value
                      ? "bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300 border"
                      : "bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                  }`}
                >
                  {option.icon}
                  <span className="text-sm">{option.value}</span>
                </button>
              ))}
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="space-y-3">
            <Link 
              to='/admin/dashboard/profile' 
              className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-2 px-4 rounded-lg transition-all shadow-sm hover:shadow"
            >
              <FaUser className="text-blue-200" />
              <span>Edit Profile</span>
            </Link>
            
            <Link 
              to='/admin/resetpassword' 
              className="w-full flex items-center justify-center space-x-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 py-2 px-4 rounded-lg transition-all hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <FaLock className="text-gray-500 dark:text-gray-400" />
              <span>Change Password</span>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};