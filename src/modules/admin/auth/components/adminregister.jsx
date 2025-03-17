import React, { useState } from "react";
import Label from "../../../../components/ui/label/label";
import Button from "../../../../components/ui/button/Button";
import Input from "../../../../components/ui/input/input";

import { FiEye, FiEyeOff } from "react-icons/fi";
import { useAdminRegisterFormik } from "../formik/useAdminregister";
import { Verification } from "@/modules/user/auth/components/verification";

const AdminRegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { formik, isLoading,isRegistrationSuccess } = useAdminRegisterFormik({
    mutationConfig: {
      onSuccess: (data) => {
        console.log("Admin Registration Successful:", data);
      },
      onError: (error) => console.error("Registration failed:", error),
    },
  });

  if (isRegistrationSuccess) {
    return <Verification />;
  }

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      {/* Full Name Field */}
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
        {isLoading ? "Signing Up..." : "Sign Up"}
      </Button>
    </form>
  );
};

export default AdminRegisterForm;
