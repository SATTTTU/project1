import React from "react";
import FileUploadField from "./FileUploadField";
import NavigationButtons from "./NavigationButtons";

const CertificateExperienceStep = ({ 
  formData, 
  handleInputChange, 
  fileHandlingProps,
  prevStep,
  nextStep 
}) => {
  return (
    <div className="space-y-4 cursor-grab">
      <fieldset>
        <legend className="text-lg font-bold mb-4">
          Upload your cooking certificate and share your experience
        </legend>
        <FileUploadField
          name="certificate"
          label="Certificate (if available)"
          formData={formData}
          fileHandlingProps={fileHandlingProps}
        />

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Past Experience
          </label>
          <textarea
            name="experience"
            rows="4"
            value={formData.experience}
            onChange={handleInputChange}
            placeholder="Describe your cooking experience..."
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-[#4b6c1e]"
          />
        </div>
      </fieldset>

      <NavigationButtons prevStep={prevStep} nextStep={nextStep} />
    </div>
  );
};

export default CertificateExperienceStep;