// components/CertificateExperienceStep.jsx
import React from "react";
import FileUpload from "./fileupload";

const CertificateExperienceStep = ({
  formData,
  handleInputChange,
  fileHandlingProps,
  prevStep,
  nextStep,
}) => {
  return (
    <form onSubmit={nextStep}>
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Professional Qualifications</h2>
        <p className="text-gray-600 mb-6">
          Please upload your certificates and share your cooking experience.
        </p>

        <FileUpload
          label="Certificate"
          name="certificate"
          accept=".pdf,.jpg,.jpeg,.png"
          file={formData.certificate}
          {...fileHandlingProps}
        />

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Experience (in years)
          </label>
          <textarea
            name="experience"
            value={formData.experience}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#4b6c1e] focus:border-[#4b6c1e]"
            rows="4"
            placeholder="Describe your cooking experience..."
          ></textarea>
          {fileHandlingProps.errors.experience && (
            <p className="text-red-500 text-sm mt-1">
              {fileHandlingProps.errors.experience}
            </p>
          )}
        </div>

        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={prevStep}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Back
          </button>
          <button
            type="submit"
            className="bg-[#4b6c1e] text-white px-6 py-2 rounded-lg hover:bg-[#3a5417] transition-colors"
          >
            Continue
          </button>
        </div>
      </div>
    </form>
  );
};

export default CertificateExperienceStep;