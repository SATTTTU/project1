import React from "react";
import ForgotPasswordForm from "./ForgotPasswordForm";
import IllustrationSection from "./IllustrationSection";

const ForgotPassword = () => {
  const handleFormSubmit = (email) => {
    // Handle password reset logic here
    console.log("Password reset requested for:", email);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-xl max-w-3xl w-full p-8 flex">
        <IllustrationSection />
        <div className="flex-1 px-4 md:px-8">
          <h1 className="text-3xl font-semibold text-green-700 mb-2">
            Forgot Password?
          </h1>
          <p className="text-gray-600 mb-8">
            Enter the email address associated with your account.
          </p>
          <ForgotPasswordForm onSubmit={handleFormSubmit} />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;