// components/DocumentUploadStep.jsx
import React from "react";
import FileUpload from "./fileupload";


const DocumentUploadStep = ({ formData, fileHandlingProps, nextStep }) => {
  return (
    <form onSubmit={nextStep}>
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Upload Personal Documents</h2>
        <p className="text-gray-600 mb-6">
          Please upload your passport-sized photo and citizenship documents.
        </p>

        <FileUpload
          label="Passport Size Photo"
          name="passwordsizephoto"
          accept="image/*"
          file={formData.passwordsizephoto}
          {...fileHandlingProps}
        />

        <FileUpload
          label="Citizenship Front"
          name="citizenshipFront"
          accept="image/*"
          file={formData.citizenshipFront}
          {...fileHandlingProps}
        />

        <FileUpload
          label="Citizenship Back"
          name="citizenshipBack"
          accept="image/*"
          file={formData.citizenshipBack}
          {...fileHandlingProps}
        />

        <div className="flex justify-end mt-8">
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

export default DocumentUploadStep;