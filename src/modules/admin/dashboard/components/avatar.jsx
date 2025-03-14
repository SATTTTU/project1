// components/ProfileAvatar.js
import React from "react";

export const ProfileAvatar = ({ onClick, name = "Admin", imageUrl }) => {
  // Extract initials from the name
  const getInitials = (name) => {
    const nameParts = name.split(" ");
    const initials = nameParts.map((part) => part[0]).join("");
    return initials.toUpperCase();
  };

  return (
    <div
      className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg"
      onClick={onClick}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={`Profile picture of ${name}`}
          className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
        />
      ) : (
        <div className="w-10 h-10 flex items-center justify-center bg-gray-200 text-gray-700 font-medium rounded-full border-2 border-gray-200">
          {getInitials(name)}
        </div>
      )}
      <span className="text-gray-700 font-medium text-base hidden sm:block">
        {name}
      </span>
    </div>
  );
};
