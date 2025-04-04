import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Label from "@/components/ui/label/label";
import Button from "@/components/ui/button/Button";
import Input from "@/components/ui/input/input";
import { useRiderLoginFormik } from "../formik/useRiderLogin";

 export const RiderLoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { formik, isLoading } = useRiderLoginFormik({
    mutationConfig: {
      onSuccess: (data) => console.log("Admin Login Successful:", data),
      onError: (error) => console.error("Login failed:", error),
    },
  });

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-lg space-y-6 border border-gray-200">
      <h2 className="text-2xl font-semibold text-center text-gray-800">Rider Login</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-5">
        {/* Email Field */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-gray-700 font-medium">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-500 text-sm">{formik.errors.email}</div>
          )}
        </div>

        {/* Password Field */}
        <div className="relative space-y-2">
          <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-4 top-11 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </button>
          {formik.touched.password && formik.errors.password && (
            <div className="text-red-500 text-sm">{formik.errors.password}</div>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isLoading || formik.isSubmitting || !formik.isValid}
          className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all disabled:bg-gray-400"
        >
          {isLoading ? "Logging In..." : "Login"}
        </Button>
      </form>
    </div>
  );
};
