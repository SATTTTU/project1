import React, { useState } from "react";
import Label from "../../../../components/ui/label/Label";
import Button from "../../../../components/ui/button/Button";
import Input from "../../../../components/ui/input/Input";
import { useAdminForgotPasswordFormik } from "../formik/useForgotPassword";
import { Verification } from "@/modules/user/auth/components/verification";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");

  const { formik, isLoading,isRegistrationSuccess } = useAdminForgotPasswordFormik();
  if(isRegistrationSuccess){
    return <Verification/>
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-center text-2xl font-bold text-gray-700">Forgot Password</h2>
        <p className="text-center text-sm text-gray-500">
          Enter your email address to receive a link to reset your password.
        </p>

        <form onSubmit={formik?.handleSubmit} className="space-y-6 mt-8">
          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formik?.values.email || email}
              onChange={(e) => {
                setEmail(e.target.value);
                formik?.handleChange(e);
              }}
              onBlur={formik?.handleBlur}
              required
              className="w-full"
            />
            {formik?.touched.email && formik.errors.email && (
              <div className="text-red-500 text-sm">{formik.errors.email}</div>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading || formik?.isSubmitting || !formik?.isValid}
            className="w-full cursor-pointer"
          >
            {isLoading ? "Sending..." : "Send Reset Link"}
          </Button>

          {/* Footer Link */}
          <div className="text-center">
            <p className="text-sm text-gray-500">
              Remembered your password?{" "}
              <a href="/admin/login" className="text-green-500 hover:text-green-700">
                Login
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
