import React from "react";
import { Link } from "react-router-dom";

const AuthSidebar = ({ image, title, subtitle, buttonText, buttonLink }) => {
  // Handle both string-based image paths and component-based images
  const ImageComponent = typeof image === "string" ? null : image;

  return (
    <div className="relative hidden md:flex md:w-1/2">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/30 z-10"></div>
      
      {/* Background image */}
      {ImageComponent ? (
        <ImageComponent />
      ) : (
        <img
          src={image}
          alt="Authentication background"
          className="object-cover w-full h-full"
        />
      )}
      
      {/* Content overlay */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white p-12">
        <h2 className="text-4xl font-bold mb-4">{title}</h2>
        
        {/* Subtitle paragraphs */}
        {subtitle && subtitle.map((text, index) => (
          <p key={index} className="text-center mb-2">
            {text}
          </p>
        ))}
        
        {/* CTA Button */}
        <div className="mt-6">
          <Link
            to={buttonLink}
            className="bg-white text-black px-8 py-3 rounded hover:bg-gray-100 transition-colors"
          >
            {buttonText}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthSidebar;