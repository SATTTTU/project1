// components/ProfileAvatar.js
import React from "react";

export const ProfileAvatar = ({ onClick }) => {
  return (
    <div
      className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg"
      onClick={onClick}
    >
      <img
        src="https://via.placeholder.com/40"
        alt="Admin"
        className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
      />
      <span className="text-gray-700 font-medium hidden sm:block">Admin</span>
    </div>
  );
};
