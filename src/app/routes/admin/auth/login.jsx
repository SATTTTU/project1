import React from "react";
import Card from "../../../../components/ui/card/Card";
import { Link } from "react-router-dom";
import AdminLoginForm from "@/modules/admin/auth/components/adminlogin";

 export const AdminLoginRoute = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Admin Login</h2>
        <AdminLoginForm />
        <div className="text-center mt-4">
          <Link to="/forgot-password" className="text-blue-500 hover:underline">
            Forgot Password?
          </Link>
        </div>
        <div className="text-center mt-2">
          <span className="text-gray-600">Don't have an account? </span>
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </div>
      </Card>
    </div>
  );
};

