import React from "react";
import Card from "../../../../components/ui/card/Card";
import { Link } from "react-router-dom";
import ResetPasswordForm from "@/modules/admin/auth/components/adminresetPassword";
export const ResetPasswordRoute = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Reset Password</h2>
        <ResetPasswordForm />
        <div className="text-center mt-4">
          <span className="text-gray-600">Remembered your password? </span>
          <Link to="/admin/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default ResetPasswordRoute;
