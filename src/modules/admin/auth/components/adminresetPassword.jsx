import React, { useState } from "react";
import Label from "../../../../components/ui/label/Label";
import Button from "../../../../components/ui/button/Button";
import Input from "../../../../components/ui/input/Input";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useAdminResetPassword } from "../api/create-newPassword";

const ResetPasswordForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { formik, isLoading } = useAdminResetPassword();

  return (
    <form onSubmit={formik?.handleSubmit} className="space-y-4">
      {/* Email Field */}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={formik?.values.email}
          onChange={formik?.handleChange}
          onBlur={formik?.handleBlur}
          required
          className="w-full"
        />
        {formik?.touched.email && formik.errors.email && (
          <div className="text-red-500 text-sm">{formik.errors.email}</div>
        )}
      </div>

      {/* New Password Field */}
      <div className="space-y-2 relative">
        <Label htmlFor="newPassword">New Password</Label>
        <Input
          id="newPassword"
          name="newPassword"
          type={showPassword ? "text" : "password"}
          placeholder="Enter new password"
          value={formik?.values.newPassword}
          onChange={formik?.handleChange}
          onBlur={formik?.handleBlur}
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
        {formik?.touched.newPassword && formik.errors.newPassword && (
          <div className="text-red-500 text-sm">{formik.errors.newPassword}</div>
        )}
      </div>

      {/* Confirm Password Field */}
      <div className="space-y-2 relative">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type={showPassword ? "text" : "password"}
          placeholder="Confirm new password"
          value={formik?.values.confirmPassword}
          onChange={formik?.handleChange}
          onBlur={formik?.handleBlur}
          required
          className="w-full"
        />
        {formik?.touched.confirmPassword && formik.errors.confirmPassword && (
          <div className="text-red-500 text-sm">{formik.errors.confirmPassword}</div>
        )}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isLoading || formik?.isSubmitting || !formik?.isValid}
        className="w-full cursor-pointer"
      >
        {isLoading ? "Resetting..." : "Reset Password"}
      </Button>
    </form>
  );
};

export default ResetPasswordForm;
