// AuthSidebar.jsx - Reusable sidebar component for auth pages
import React from "react";
import { Link } from "react-router-dom";

export const AuthSidebar = ({ image, title, subtitle, buttonText, buttonLink }) => {
  return (
    <div className="relative hidden md:flex w-1/2">
      <div className="absolute inset-0 bg-black/30 z-10"></div>
      <img
        src={image}
        alt="Authentication background"
        className="object-cover w-full"
      />
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white p-12">
        <h2 className="text-4xl font-bold mb-4">{title}</h2>
        {subtitle && subtitle.map((line, index) => (
          <p key={index} className="text-center mb-2">
            {line}
          </p>
        ))}
        <div className="mt-6">
          <Link
            className="bg-white text-black px-8 py-3 rounded hover:bg-gray-100 transition-colors cursor-pointer"
            to={buttonLink}
          >
            {buttonText}
          </Link>
        </div>
      </div>
    </div>
  );
};