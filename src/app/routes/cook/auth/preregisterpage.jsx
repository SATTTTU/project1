
import { PreRegisterForm } from "@/modules/cook/auth/components/preregisterform";
import { WelcomePanel } from "@/modules/cook/auth/components/welcome";
import React from "react";


 export const FirstRegisterPageRoute = () => {
  const handleFormSubmit = () => {
    window.location.href = "/cook/verification";
  };

  return (
    <div className="flex h-screen w-full">
      <WelcomePanel/>
      <div className="w-full md:w-1/2 flex flex-col py-30 overflow-y-auto">
        <div className="max-w-md mx-auto w-full">
          <PreRegisterForm onSubmit={handleFormSubmit} />
        </div>
      </div>
    </div>
  );
};

