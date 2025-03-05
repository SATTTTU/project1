import React from "react";

const Label = ({ htmlFor, children, className }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`block text-gray-700 font-medium mb-1 ${className}`}
    >
      {children}
    </label>
  );
};

export default Label;
