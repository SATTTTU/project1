// PasswordStep.jsx - Second step of the login process
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";

export const PasswordStep = ({ 
  password, 
  rememberMe, 
  error, 
  handleChange, 
  handlePrevStep,
  isSubmitting 
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div className="space-y-2">
        <label htmlFor="password" className="block text-sm text-gray-600">
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={handleChange}
            placeholder="••••••••"
            className={`w-full rounded border ${
              error ? "border-red-500" : "border-gray-300"
            } px-4 py-3 focus:border-[#4b6c1e] focus:outline-none`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 transition ease-in-out"
          >
            {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </button>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>

      {/* Remember Me & Forgot Password */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="rememberMe"
            type="checkbox"
            checked={rememberMe}
            onChange={handleChange}
            className="h-4 w-4 rounded border-gray-300 text-[#4b6c1e] focus:ring-[#4b6c1e]"
          />
          <label htmlFor="remember-me" className="ml-2 text-sm text-gray-600">
            Remember me
          </label>
        </div>
        <Link
          to="/cook/forgetPassword"
          className="text-sm text-[#4b6c1e] hover:underline cursor-pointer"
        >
          Forgot Password?
        </Link>
      </div>

      <div className="flex space-x-4">
        <button
          type="button"
          onClick={handlePrevStep}
          className="w-1/3 rounded cursor-pointer border border-gray-300 bg-white py-3 text-gray-700 transition-colors hover:bg-gray-50"
        >
          Back
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-2/3 rounded cursor-pointer bg-[#4b6c1e] py-3 text-white transition-colors hover:bg-[#3d5819] disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Logging in..." : "Log in"}
        </button>
      </div>
    </>
  );
};