import React from "react";
import FileUploadField from "./FileUploadField";
import NavigationButtons from "./NavigationButtons";

const DocumentUploadStep = ({ formData, fileHandlingProps, prevStep, nextStep }) => {
  return (
    <div className="space-y-4 cursor-grab">
      <fieldset>
        <legend className="text-lg font-bold mb-4">
          Upload your photo and documents
        </legend>
        <FileUploadField
          name="passwordsizephoto"
          label="Password size photo"
          required
          formData={formData}
          fileHandlingProps={fileHandlingProps}
        />
        <FileUploadField
          name="citizenshipFront"
          label="Citizenship Front"
          required
          formData={formData}
          fileHandlingProps={fileHandlingProps}
        />
        <FileUploadField
          name="citizenshipBack"
          label="Citizenship Back"
          required
          formData={formData}
          fileHandlingProps={fileHandlingProps}
        />
      </fieldset>

      <NavigationButtons 
        prevStep={prevStep} 
        nextStep={nextStep}
        isPrevDisabled={true}
      />
    </div>
  );
};

export default DocumentUploadStep;
