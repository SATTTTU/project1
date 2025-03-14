import React from "react";
import forgetPassword from "../../../../../assets/forgetPasswordimg.png";

const IllustrationSection = () => {
  return (
    <div className="flex-1 hidden md:block">
      <img
        src={forgetPassword}
        alt="Security illustration"
        className="w-full h-auto"
      />
    </div>
  );
};

export default IllustrationSection;