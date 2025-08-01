import React, { useState } from "react";
import Label from "../../../../components/ui/label/label";
import Button from "../../../../components/ui/button/Button";
import Input from "../../../../components/ui/input/input";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useAdminLoginFormik } from "../formik/useAdminlogin";
const AdminLoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { formik, isLoading } = useAdminLoginFormik({
    mutationConfig: {
      onSuccess: (data) => console.log("Admin Login Successful:", data),
      onError: (error) => console.error("Login failed:", error),
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      {/* Email Field */}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          required
          className="w-full"
        />
        {formik.touched.email && formik.errors.email && (
          <div className="text-red-500 text-sm">{formik.errors.email}</div>
        )}
      </div>

      {/* Password Field */}
      <div className="space-y-2 relative">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          required
          className="w-full"
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-12 transform -translate-y-1/2 text-gray-500"
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
        className="w-full cursor-pointer"
      >
        {isLoading ? "Logging In..." : "Login"}
      </Button>
    </form>
  );
};

export default AdminLoginForm;
