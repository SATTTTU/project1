import React from "react";

const AuthSidebar = ({ image }) => {
  return (
    <div className="relative hidden w-1/2 md:block">
      <div className="absolute inset-0 bg-black/30 z-10"></div>
      <img src={image} alt="Background" className="object-cover h-screen" />
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white p-12">
        <h2 className="text-4xl font-bold mb-4">Hello, Friends</h2>
        <p className="text-center mb-2">Enter your Personal Details</p>
        <p className="text-center mb-8">Start your journey with us</p>
      </div>
    </div>
  );
};

export default AuthSidebar;