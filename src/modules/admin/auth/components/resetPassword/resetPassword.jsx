import React, { useState } from "react";
import { FaLock, FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import axios from "axios";

export const ResetPassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleResetPassword = async () => {
    // Validation
    if (!oldPassword || !newPassword || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    // Password strength check
    if (newPassword.length < 12) {
      setError("Password must be at least 12 characters long");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await axios.post("/api/admin/reset-password", {
        oldPassword,
        newPassword,
      });
      
      if (response.status === 200) {
        setSuccess(true);
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Password reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="w-full max-w-md bg-white shadow-lg rounded-lg p-6"
      >
        <div className="mb-4">
          <div className="flex items-center space-x-2 mb-4">
            <FaLock className="text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-800">Reset Password</h3>
          </div>

          {success ? (
            <div className="text-center space-y-4">
              <FaCheckCircle className="mx-auto text-green-500" size={48} />
              <p className="text-gray-700 font-medium">
                Password Reset Successful
              </p>
              <p className="text-gray-500 text-sm">
                Your account password has been updated.
              </p>
            </div>
          ) : (
            <form className="space-y-4">
              <div>
                <label 
                  htmlFor="oldPassword" 
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Current Password
                </label>
                <input
                  type="password"
                  id="oldPassword"
                  className="w-full px-3 py-2 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="Enter current password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>

              <div>
                <label 
                  htmlFor="newPassword" 
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  className="w-full px-3 py-2 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>

              <div>
                <label 
                  htmlFor="confirmPassword" 
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  className="w-full px-3 py-2 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              {error && (
                <div className="bg-red-100 text-red-600 p-3 rounded-lg border border-red-200">
                  {error}
                </div>
              )}

              <div>
                {loading ? (
                  <button 
                    className="w-full bg-blue-600 text-white py-2 rounded-lg cursor-not-allowed opacity-50"
                    disabled
                  >
                    Resetting...
                  </button>
                ) : (
                  <button 
                    onClick={handleResetPassword}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-all"
                  >
                    Reset Password
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};
