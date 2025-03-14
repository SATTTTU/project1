import React from "react";
import { Link } from "react-router-dom";
import { FiLoader, FiFile } from "react-icons/fi";

const TermsConditionsStep = ({ 
  formData, 
  handleInputChange, 
  errors,
  isLoading,
  prevStep,
  nextStep 
}) => {
  return (
    <div className="space-y-4 cursor-pointer">
      {/* Preview uploaded documents */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">
          Uploaded Documents
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {[
            "passwordsizephoto",
            "citizenshipFront",
            "citizenshipBack",
            "certificate",
          ].map(
            (field) =>
              formData[field] && (
                <div key={field} className="shadow-lg rounded-md p-2">
                  <p className="text-xs text-gray-500 mb-1">
                    {field === "passwordsizephoto" && "Photo"}
                    {field === "citizenshipFront" &&
                      "Citizenship (Front)"}
                    {field === "citizenshipBack" &&
                      "Citizenship (Back)"}
                    {field === "certificate" && "Certificate"}
                  </p>
                  <div className="bg-gray-100 rounded flex items-center justify-center p-2">
                    <FiFile className="text-[#4b6c1e] mr-1" />
                    <span className="text-xs truncate">
                      {formData[field].name}
                    </span>
                  </div>
                </div>
              )
          )}
        </div>
      </div>

      <fieldset className="mb-6">
        <legend className="text-lg font-bold mb-2">
          Terms and Conditions
        </legend>
        <div className="bg-gray-50 p-4 rounded-lg mb-4 max-h-60 overflow-y-auto">
          <p className="text-gray-600 text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Nullam auctor, nisl eget ultricies tincidunt, nisl nisl
            aliquam nisl, eget ultricies nisl nisl eget nisl.
            <br />
            <br />
            Nullam auctor, nisl eget ultricies tincidunt, nisl nisl
            aliquam nisl, eget ultricies nisl nisl eget nisl.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="termsAccepted"
            name="termsAccepted"
            checked={formData.termsAccepted}
            onChange={handleInputChange}
          />
          <label
            htmlFor="termsAccepted"
            className="text-sm font-medium"
          >
            I agree to the terms and conditions
          </label>
        </div>
        {errors.termsAccepted && (
          <p className="text-red-500 text-sm mt-1">
            {errors.termsAccepted}
          </p>
        )}
      </fieldset>

      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={prevStep}
          className="px-6 py-2 border border-[#4b6c1e] text-[#4b6c1e] rounded"
        >
          Previous
        </button>
        {!isLoading ? (
          <Link
            to="/cook/underreview"
            onClick={nextStep}
            className="px-6 rounded bg-[#4b6c1e] cursor-pointer py-3 text-white transition-colors hover:bg-[#3d5819] flex items-center"
          >
            Submit
          </Link>
        ) : (
          <button
            disabled
            className="px-6 rounded bg-[#4b6c1e] cursor-wait py-3 text-white transition-colors hover:bg-[#3d5819] flex items-center"
          >
            <FiLoader className="mr-2 h-5 w-5 animate-spin" />
            Submitting...
          </button>
        )}
      </div>
    </div>
  );
};

export default TermsConditionsStep;