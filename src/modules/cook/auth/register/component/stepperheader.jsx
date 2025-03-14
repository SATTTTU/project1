import React from "react";

const StepperHeader = ({ currentStep, totalSteps }) => {
  return (
    <div className="flex items-center justify-between gap-2 pt-2 mb-8">
      {Array.from({ length: totalSteps }, (_, i) => i + 1).map((num, index) => (
        <div key={num} className="flex items-center flex-1">
          <div
            className={`w-8 h-8 flex items-center justify-center text-sm font-semibold rounded-full ${
              currentStep >= num
                ? "bg-[#4b6c1e] text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {num}
          </div>
          {index < totalSteps - 1 && (
            <div className="relative flex-1 h-1 mx-2">
              <div className="absolute w-full h-full bg-gray-200 rounded"></div>
              <div
                className={`absolute h-full rounded ${
                  currentStep > num
                    ? "w-full bg-[#4b6c1e]"
                    : "w-0 bg-transparent"
                }`}
              ></div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default StepperHeader;