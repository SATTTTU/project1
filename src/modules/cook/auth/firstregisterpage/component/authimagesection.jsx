import React from "react";
import { Link } from "react-router-dom";
import authimage from "../../../../../assets/background1.jpg";

const AuthImageSection = () => {
  return (
    <div className="relative flex w-1/2">
      <div className="absolute inset-0 bg-black/30 z-10"></div>
      <img
        src={authimage}
        alt="Delicious food plate"
        className="object-cover"
        sizes="100%"
      />
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white p-12">
        <h2 className="text-4xl font-bold mb-4">Hello, Friendsssss</h2>
        <p className="text-center mb-2">Enter your Personal Details</p>
        <p className="text-center mb-8">Start your journey with us</p>
        <Link
          to="/cook/login"
          className="bg-white text-black px-8 py-3 rounded hover:bg-gray-100 transition-colors"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default AuthImageSection;