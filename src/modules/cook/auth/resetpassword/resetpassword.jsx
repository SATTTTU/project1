// ResetPassword.jsx
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { IoEyeOffSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { usePasswordValidator } from "./validater/passwordvalidater";

export const ResetPassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [error, setError] = useState("");
  const { validatePasswords } = usePasswordValidator();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate passwords using our validator hook
    const validation = validatePasswords(oldPassword, newPassword);
    
    if (!validation.isValid) {
      setError(validation.error);
      return;
    }

    console.log("Resetting password...", { oldPassword, newPassword });
    
    // Reset form after successful submission
    setOldPassword("");
    setNewPassword("");
    setError("");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Reset your password
          </h1>
          <p className="text-gray-600">
            Remember, this password will be used across all your accounts and
            services associated with our platform. Choose a strong and secure
            password.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Old Password Field */}
          <div className="mb-6">
            <label htmlFor="oldPassword" className="block text-gray-700 font-medium mb-2">
              Current password
            </label>
            <div className="relative">
              <input
                id="oldPassword"
                type={showOldPassword ? "text" : "password"}
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowOldPassword(!showOldPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label={showOldPassword ? "Hide password" : "Show password"}
              >
                {showOldPassword ? (
                  <IoEyeOffSharp />
                ) : (
                  <FaEye />
                )}
              </button>
            </div>
          </div>

          {/* New Password Field */}
          <div className="mb-6">
            <label htmlFor="newPassword" className="block text-gray-700 font-medium mb-2">
              New password
            </label>
            <div className="relative">
              <input
                id="newPassword"
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label={showNewPassword ? "Hide password" : "Show password"}
              >
                {showNewPassword ? (
                  <IoEyeOffSharp />
                ) : (
                  <FaEye />
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 text-red-700 p-3 rounded-md mb-6">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-4">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white py-2 rounded-md font-medium transition-colors"
            >
              Reset password
            </button>
            
            <Link
              to="/login"
              className="text-center text-gray-600 hover:text-gray-800"
            >
              Cancel and return to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};