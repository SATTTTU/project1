import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { IoEyeOffSharp } from "react-icons/io5";

export const ResetPassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!oldPassword || !newPassword) {
      setError("Both passwords are required");
      return;
    }

    if (oldPassword === newPassword) {
      setError("New password must be different from old password");
      return;
    }

    console.log("Resetting password...", { oldPassword, newPassword });

    setOldPassword("");
    setNewPassword("");
    setError("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm bg-white rounded-lg shadow-md border border-gray-100 p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="old-password" className="block text-sm font-medium text-gray-900 mb-2">
              Old Password
            </label>
            <div className="relative">
              <input
                id="old-password"
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
                {showOldPassword ? <IoEyeOffSharp className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="new-password" className="block text-sm font-medium text-gray-900 mb-2">
              New Password
            </label>
            <div className="relative">
              <input
                id="new-password"
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 "
              >
                {showNewPassword ? <IoEyeOffSharp className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-green-700 text-white py-2 px-4 rounded-md hover:bg-green-900 transition-colors"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};
