// LoginPage.jsx - Main container component
import React from "react";
import authimage from "../../../../assets/login.jpg";
import { LoginForm } from "@/modules/cook/auth/components/loginpage";
import AuthSidebar from "@/components/ui/cookui/cooksidebar/cooksidebar";

export const Login = () => {
  return (
    <div className="flex h-screen">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md p-8">
          <h1 className="text-2xl font-bold text-center mb-8">
            Login as Cook
          </h1>
          
          <LoginForm />
        </div>
      </div>
      <AuthSidebar 
        image={authimage}
        buttonText="Sign Up Now"
        buttonLink="/cook/preregister"
        title="Welcome to Khajabox, Chef!"
subtitle="Your culinary journey starts here. Log in to manage your kitchen, connect with food lovers, and bring your signature dishes to life."
      />
    </div>
  );
};