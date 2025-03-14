// components/TermsConditionsStep.jsx
import React from "react";

const TermsConditionsStep = ({
  formData,
  handleInputChange,
  errors,
  isLoading,
  prevStep,
  nextStep,
}) => {
  return (
    <form onSubmit={nextStep}>
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Terms and Conditions</h2>
        <p className="text-gray-600 mb-6">
          Please read and accept our terms and conditions to continue.
        </p>

        <div className="bg-gray-50 p-4 rounded-md h-64 overflow-y-auto text-sm mb-4 border border-gray-200">
          <h3 className="font-semibold mb-2">Terms of Service</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget
            aliquam nisl nisl eget nisl. Nullam auctor, nisl eget ultricies
            tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl.
          </p>
          <h3 className="font-semibold mt-4 mb-2">Privacy Policy</h3>
          <p>
            Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam
            nisl, eget aliquam nisl nisl eget nisl. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Nullam auctor, nisl eget ultricies
            tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl.
          </p>
          <h3 className="font-semibold mt-4 mb-2">Cook's Responsibilities</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget
            aliquam nisl nisl eget nisl. Nullam auctor, nisl eget ultricies
            tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl.
          </p>
        </div>

        <div className="flex items-start mb-4">
          <input
            type="checkbox"
            id="termsAccepted"
            name="termsAccepted"
            checked={formData.termsAccepted}
            onChange={handleInputChange}
            className="mt-1"
          />
          <label htmlFor="termsAccepted" className="ml-2 text-sm">
            I have read and agree to the terms and conditions, privacy policy,
            and cook's responsibilities outlined above.
          </label>
        </div>
        {errors.termsAccepted && (
          <p className="text-red-500 text-sm">
            {errors.termsAccepted}
          </p>
        )}

        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={prevStep}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            disabled={isLoading}
          >
            Back
          </button>
          <button
            type="submit"
            className="bg-[#4b6c1e] text-white px-6 py-2 rounded-lg hover:bg-[#3a5417] transition-colors flex items-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Submitting...
              </>
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default TermsConditionsStep;