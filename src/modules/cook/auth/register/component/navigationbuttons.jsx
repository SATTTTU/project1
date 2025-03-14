import React from "react";

const NavigationButtons = ({ 
  prevStep, 
  nextStep, 
  isPrevDisabled = false,
  nextButtonText = "Next" 
}) => {
  return (
    <div className="flex justify-between pt-4">
      <button
        type="button"
        onClick={prevStep}
        className={`px-6 py-2 border border-[#4b6c1e] text-[#4b6c1e] rounded ${
          isPrevDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
        }`}
        disabled={isPrevDisabled}
      >
        Previous
      </button>
      <button
        type="button"
        onClick={nextStep}
        className="px-6 rounded cursor-pointer bg-[#4b6c1e] py-3 text-white transition-colors hover:bg-[#3d5819]"
      >
        {nextButtonText}
      </button>
    </div>
  );
};

export default NavigationButtons;