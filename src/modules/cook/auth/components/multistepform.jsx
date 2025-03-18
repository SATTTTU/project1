import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookDocumentFormik } from "../formik/useDocumentUpload";
import { ToastContainer } from "react-toastify";
import Stepper from "./stepper";
import { CitizenshipUploadStep } from "./citizenshipupload";
import CertificatesStep from "./certificates";
import TermsStep from "./termsandconditions";
import { ChevronRight } from "lucide-react";

// Main MultiStepForm Component
const MultiStepForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  
  const { formik, isRegistering } = useCookDocumentFormik({
    mutationConfig: {
      onSuccess: (data) => {
        console.log("Submission successful:", data);
        navigate("/cook/underreview"); // Navigate on successful submission
      },
      onError: (error) => {
        console.error("Submission failed:", error);
      },
    },
  });
  
  const validateStep = (step) => {
    switch (step) {
      case 1:
        // Citizenship documents validation including passport-sized photo
        // Make sure we're using the correct field name (passwordsizedphoto)
        formik.setFieldTouched('passwordsizedphoto', true);
        formik.setFieldTouched('citizenshipFront', true);
        formik.setFieldTouched('citizenshipBack', true);
        formik.validateField('passwordsizedphoto');
        formik.validateField('citizenshipFront');
        formik.validateField('citizenshipBack');
        return !formik.errors.passwordsizedphoto && !formik.errors.citizenshipFront && 
               !formik.errors.citizenshipBack && formik.values.passwordsizedphoto &&
               formik.values.citizenshipFront && formik.values.citizenshipBack;
      
      case 2:
        // Certificates step validation - optional fields, so always allow proceeding
        return true;
      
      case 3:
        // Terms acceptance validation
        formik.setFieldTouched('termsAccepted', true);
        formik.validateField('termsAccepted');
        return !formik.errors.termsAccepted && formik.values.termsAccepted;
      
      default:
        return true;
    }
  };
  
  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
    }
  };
  
  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateStep(currentStep)) {
      // For the last step, submit the form and then navigate if valid
      if (isLastStep) {
        formik.handleSubmit(e);
        // Navigation will be handled by onSuccess callback
      } else {
        // Just do normal validation for non-final steps
        formik.validateForm().then(errors => {
          if (Object.keys(errors).length === 0) {
            handleNext();
          }
        });
      }
    }
  };
  
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <CitizenshipUploadStep formik={formik} />;
      case 2:
        return <CertificatesStep formik={formik} />;
      case 3:
        return <TermsStep formik={formik} />;
      default:
        return null;
    }
  };
  
  const isLastStep = currentStep === 3;
  
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <ToastContainer />
      <Stepper currentStep={currentStep} steps={['Citizenship', 'Certificates', 'Terms']} />
      
      <form onSubmit={handleSubmit} className="mt-8">
        {renderStep()}
        
        {formik.errors.submit && (
          <div className="text-red-500 mt-4">{formik.errors.submit}</div>
        )}
        
        <div className="flex justify-between mt-8">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={handlePrevious}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              disabled={formik.isSubmitting || isRegistering}
            >
              Back
            </button>
          )}
          
          {isLastStep ? (
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center"
              disabled={formik.isSubmitting || isRegistering}
            >
              {formik.isSubmitting || isRegistering ? 'Submitting...' : 'Submit'}
              {!(formik.isSubmitting || isRegistering) && <ChevronRight className="ml-1 h-4 w-4" />}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNext}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center"
              disabled={formik.isSubmitting || isRegistering}
            >
              Next
              <ChevronRight className="ml-1 h-4 w-4" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default MultiStepForm;