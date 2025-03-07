import React, { useState } from "react";
import { FaMoon, FaSun, FaUser, FaLock, FaCog } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

 export const SettingsCard = () => {
  const [theme, setTheme] = useState("Light");

  const themeOptions = [
    { value: "Light", icon: <FaSun className="text-yellow-500" /> },
    { value: "Dark", icon: <FaMoon className="text-indigo-500" /> }
  ];

  return (
    <div className="relative">
      
      { (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="absolute right-0 mt-3 w-64 bg-white shadow-lg rounded-lg p-4"
        >
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Settings</h3>
          <div className="mb-4">
            <span className="block text-gray-700 font-medium mb-2">Theme</span>
            <div className="flex space-x-2">
              {themeOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setTheme(option.value)}
                  className={`flex items-center space-x-2 p-2 rounded-lg border w-full transition-all ${
                    theme === option.value
                      ? "bg-blue-100 border-blue-500"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {option.icon}
                  <span>{option.value}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Link to='/admin/dashboard/profile' className="w-full flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-all">
              <FaUser /> <span>Change Profile</span>
            </Link>
            <Link to='/admin/dashboard/resetpassword' className="w-full flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-all">
              <FaLock /> <span>Change Password</span>
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
};

