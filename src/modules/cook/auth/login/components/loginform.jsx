import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useCookLoginFormik } from "../formik/useCookLogin";

export const LoginForm = () => {
  const { formik, isLoading, isError, error } = useCookLoginFormik();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      {isError && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error?.message || "Login failed. Please try again."}
        </div>
      )}

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {/* Email Field */}
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm text-gray-600">
            E-mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="example@gmail.com"
            className={`w-full rounded border ${
              formik.errors.email && formik.touched.email ? "border-red-500" : "border-gray-300"
            } px-4 py-3 focus:border-[#4b6c1e] focus:outline-none`}
          />
          {formik.errors.email && formik.touched.email && (
            <p className="text-red-500 text-sm">{formik.errors.email}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm text-gray-600">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="••••••••"
              className={`w-full rounded border ${
                formik.errors.password && formik.touched.password ? "border-red-500" : "border-gray-300"
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
          {formik.errors.password && formik.touched.password && (
            <p className="text-red-500 text-sm">{formik.errors.password}</p>
          )}
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="rememberMe"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-[#4b6c1e] focus:ring-[#4b6c1e]"
            />
            <label htmlFor="remember-me" className="ml-2 text-sm text-gray-600">
              Remember me
            </label>
          </div>
          <Link to="/cook/forgetPassword" className="text-sm text-[#4b6c1e] hover:underline cursor-pointer">
            Forgot Password?
          </Link>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded cursor-pointer bg-[#4b6c1e] py-3 text-white transition-colors hover:bg-[#3d5819] disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isLoading ? "Logging in..." : "Log in"}
        </button>
      </form>

      {/* OR Divider */}
      <div className="my-6 flex items-center">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="mx-4 text-sm text-gray-500">OR</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>
      <div className="flex justify-items-center">
        Don't have an account yet?
        <Link to="/cook/preregister" className="text-blue-400 underline pl-2">
          Create an account
        </Link>
      </div>
    </>
  );
};