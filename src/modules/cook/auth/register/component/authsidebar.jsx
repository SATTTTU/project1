// components/AuthSidebar.jsx
import React from "react";

const AuthSidebar = ({ image: ImageComponent }) => {
  return (
    <div className="hidden md:flex md:w-1/2 bg-[#4b6c1e] relative">
      {ImageComponent && <ImageComponent />}
      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
        <div className="text-white text-center p-8">
          <h2 className="text-3xl font-bold mb-4">Welcome to Our Platform</h2>
          <p className="text-lg">
            Join our community of professional cooks and start sharing your culinary expertise.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthSidebar;