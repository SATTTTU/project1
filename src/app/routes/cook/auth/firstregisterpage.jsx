
import AuthImageSection from "@/modules/cook/auth/firstregisterpage/component/authimagesection";
import RegisterForm from "@/modules/cook/auth/firstregisterpage/component/registerationform";
import React from "react";


 export const FirstRegisterPageRoute = () => {
  const handleFormSubmit = () => {
    window.location.href = "/cook/verification";
  };

  return (
    <div className="flex h-screen w-full">
      <AuthImageSection />
      <div className="w-full md:w-1/2 flex flex-col py-30 overflow-y-auto">
        <div className="max-w-md mx-auto w-full">
          <h1 className="text-3xl font-bold text-[#4b6c1e] mb-8">
            Sign up as Cook
          </h1>
          <RegisterForm onSubmit={handleFormSubmit} />
        </div>
      </div>
    </div>
  );
};

