import React from "react";
import Card from "../../../../components/ui/card/Card";
import { Link } from "react-router-dom";
import ForgotPasswordForm from "@/modules/admin/auth/components/forgot-password";

export const ForgotPasswordRoute = () => {
  return (
    <div className=" flex items-center justify-center ">
      
        
        <ForgotPasswordForm />
       
    </div>
  );
};
