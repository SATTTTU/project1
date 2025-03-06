import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { IoEyeOffSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

export const ResetPassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md border border-gray-100 p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <h1 className="mb-10 text-3xl font-bold text-[#4b6c1e]">
            Reset your password
          </h1>
          <div className="text-gray-400">
            {" "}
            Remember, this password will be used across all your accounts and
            services associated with our platform. Choose a strong and secure
            password.
          </div>

          <div>
            <label
              htmlFor="new-password"
              className="block text-base font-normal text-gray-900 mb-2"
            >
              New password
            </label>
            <div className="relative">
              <input
                id="new-password"
                type={showPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <IoEyeOffSharp className="h-5 w-5 " />
                ) : (
                  <FaEye className="h-5 w-5 " />
                )}
              </button>
            </div>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-[#426B1F] text-white py-2 px-4 rounded-md hover:bg-green-900 transition-colors"
          >
            Reset password
          </button>
          <Link
            className="text-[#426B1F] hover:underline flex justify-center"
            to="/cook/login"
          >
            {" "}
            cancel and return in Login
          </Link>
        </form>
      </div>
    </div>
  );
};
