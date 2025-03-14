import React from "react";
import Card from "../../../../components/ui/card/Card";
import { Link } from "react-router-dom";
import ForgotPasswordForm from "@/modules/admin/auth/components/forgot-password";

export const ForgotPasswordRoute = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Forgot Password</h2>
        <ForgotPasswordForm />
        <div className="text-center mt-4">
          <Link to="/login" className="text-blue-500 hover:underline">
            Back to Login
          </Link>
        </div>
      </Card>
    </div>
  );
};
