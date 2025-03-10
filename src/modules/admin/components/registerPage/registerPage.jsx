import React, { useState } from "react";
import Label from "../../../../components/ui/label/label";
import Button from "../../../../components/ui/button/Button";
import Card from "../../../../components/ui/card/Card";
import Input from "../../../../components/ui/input/input";
import { useAdminRegisterFormik } from "../../auth/formik/useAdminlogin";
import { FiEye, FiEyeOff } from "react-icons/fi";

const AdminLoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { formik, isLoading } = useAdminRegisterFormik({
    mutationConfig: {
      onSuccess: (data) => {
        console.log("Admin Login Successful:", data);
        // Redirect to the Admin Dashboard or Home page
      },
      onError: (error) => {
        console.error("Login failed:", error);
        // Handle login error
      },
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Admin Login</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Email Input */}
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

          {/* Password Input */}
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
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-12 transform -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 text-sm">{formik.errors.password}</div>
            )}
          </div>

          {/* Login Button */}
          <Button
            type="submit"
            disabled={isLoading || formik.isSubmitting || !formik.isValid}
            className="w-full"
          >
            {isLoading ? "Logging In..." : "Login"}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default AdminLoginPage;
