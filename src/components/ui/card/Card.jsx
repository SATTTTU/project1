import React from "react";

const Card = ({ children, className }) => {
  return (
    <div className={`border rounded-lg shadow-md p-6 bg-white ${className}`}>
      {children}
    </div>
  );
};

export default Card;
