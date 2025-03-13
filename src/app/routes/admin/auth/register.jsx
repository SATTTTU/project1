import React from "react";
import Card from "../../../../components/ui/card/Card";
import { Link } from "react-router-dom";
import AdminRegisterForm from "@/modules/admin/auth/components/adminregister";

 export const AdminRegisterRoute = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Admin Sign Up</h2>
        <AdminRegisterForm />
        <div className="text-center mt-4">
          <span className="text-gray-600">Already have an account? </span>
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </div>
      </Card>
    </div>
  );
};

