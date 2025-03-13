import React, { useState } from "react";
import Label from "../../../../components/ui/label/label";
import Button from "../../../../components/ui/button/Button";
import Card from "../../../../components/ui/card/Card";
import Input from "../../../../components/ui/input/input";
import { useAdminRegisterFormik } from "../../auth/formik/useAdminRegister";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link } from "react-router-dom";

const AdminRegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { formik, isLoading } = useAdminRegisterFormik({
    mutationConfig: {
      onSuccess: (data) => {
        console.log("Admin Registration Successful:", data);
      },
      onError: (error) => {
        console.error("Registration failed:", error);
      },
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Admin Sign Up</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your full name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
              className="w-full"
            />
            {formik.touched.name && formik.errors.name && (
              <div className="text-red-500 text-sm">{formik.errors.name}</div>
            )}
          </div>

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

          <Button
            type="submit"
            disabled={isLoading || formik.isSubmitting || !formik.isValid}
            className="w-full cursor-pointer"
          >
            {isLoading ? "Signing Up..." : "Sign Up"}
          </Button>
        </form>

        <div className="text-center mt-4">
          <span className="text-gray-600">Already have an account? </span>
          <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
        </div>
      </Card>
    </div>
  );
};

export default AdminRegisterPage;
