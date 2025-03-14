// components/StepperHeader.jsx
import React from "react";

const StepperHeader = ({ currentStep, totalSteps }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {Array.from({ length: totalSteps }, (_, index) => (
          <div
            key={index}
            className="flex flex-col items-center"
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                index + 1 === currentStep
                  ? "bg-[#4b6c1e] text-white"
                  : index + 1 < currentStep
                  ? "bg-green-200 text-green-800"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {index + 1 < currentStep ? "✓" : index + 1}
            </div>
            <span className="text-xs mt-1">
              {index === 0
                ? "Documents"
                : index === 1
                ? "Certifications"
                : "Terms"}
            </span>
          </div>
        ))}
      </div>
      <div className="relative mt-2">
        <div className="absolute top-0 h-1 bg-gray-200 w-full"></div>
        <div
          className="absolute top-0 h-1 bg-[#4b6c1e] transition-all"
          style={{
            width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default StepperHeader;