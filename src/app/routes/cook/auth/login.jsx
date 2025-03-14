// LoginPage.jsx - Main container component
import React  from "react";
import authimage from "../../../../assets/background1.jpg";
import { LoginForm } from "@/modules/cook/auth/login/components/loginform";
import { AuthSidebar } from "@/modules/cook/auth/login/components/authsidebar";


export const Login = () => {
  return (
    <div className="flex h-screen w-full">
      <div className="flex w-full flex-col justify-center px-8 md:w-1/2 lg:px-16">
        <div className="mx-auto w-full max-w-lg">
          <h1 className="mb-10 text-3xl font-bold text-[#4b6c1e]">
            Login as Cook
          </h1>
          <LoginForm />
        </div>
      </div>
      <AuthSidebar 
        image={authimage} 
        title="Hello, Friends"
        subtitle={["Enter your Personal Details", "Start journey with us"]}
        buttonText="Sign Up"
        buttonLink="/cook/preregister"
      />
    </div>
  );
};