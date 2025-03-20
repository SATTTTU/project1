import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(1);
  const [clientId, setClientId] = useState(null);
  const [userData, setUserData] = useState(null);
  
  // Extract client ID and user data from localStorage, prioritize over URL/state
  useEffect(() => {
    // First try to get userData from localStorage (contains id, name, email)
    const storedUserData = localStorage.getItem('userData');
    let userDataObj = null;
    
    if (storedUserData) {
      try {
        userDataObj = JSON.parse(storedUserData);
        setUserData(userDataObj);
      } catch (error) {
        console.error("Error parsing userData from localStorage:", error);
      }
    }
    
    // Get clientId (in order of priority):
    // 1. From localStorage (set by PreRegisterForm)
    const storedClientId = localStorage.getItem('cookClientId');
    
    // 2. From URL search params
    const params = new URLSearchParams(location.search);
    const urlClientId = params.get('clientId');
    
    // 3. From state if navigated programmatically
    const stateClientId = location.state?.clientId;
    
    // Use clientId from highest priority source
    const id = storedClientId || urlClientId || stateClientId || (userDataObj?.id);
    
    if (id) {
      setClientId(id);
      // Ensure it's stored in localStorage for persistence
      localStorage.setItem('cookClientId', id);
      console.log("Using client ID:", id);
    } else {
      console.error("No client ID found. User needs to restart registration.");
    }
  }, [location]);
  
  const { formik, isRegistering } = useCookDocumentFormik({
    mutationConfig: {
      onSuccess: (data) => {
        console.log("Documents submission successful:", data);
        // Pass clientId to next page
        navigate("/cook/underreview", { 
          state: { clientId }
        });
      },
      onError: (error) => {
        console.error("Documents submission failed:", error);
      },
    },
    initialValues: {
      // Add clientId to form data
      clientId: clientId,
      // Other initial values...
    }
  });
  
  // Update formik values when clientId changes
  useEffect(() => {
    if (clientId && formik.values.clientId !== clientId) {
      formik.setFieldValue('clientId', clientId);
    }
  }, [clientId, formik]);
  
  const validateStep = (step) => {
    switch (step) {
      case 1:
        // Citizenship documents validation including passport-sized photo
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
        return <TermsStep formik={formik} userData={userData} />;
      default:
        return null;
    }
  };
  
  const isLastStep = currentStep === 3;
  
  // Show a warning if no client ID is found
  if (!clientId) {
    return (
      <div className="w-3/4 mx-auto p-6 pt-10 bg-white rounded-lg shadow-md">
        <div className="text-red-500 font-bold">
          No client ID found. Please restart the registration process.
        </div>
        <button
          onClick={() => navigate('/cook/register')}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Go to Registration
        </button>
      </div>
    );
  }
  
  return (
    <div className="w-3/4 mx-auto p-6 pt-10 bg-white rounded-lg shadow-md">
      <ToastContainer />
      <Stepper currentStep={currentStep} steps={['Citizenship', 'Certificates', 'Terms']} />
      
      {userData && (
        <div className="mb-4 p-3 bg-green-50 rounded-md">
          <h3 className="font-medium text-green-800">Welcome, {userData.name}</h3>
          <p className="text-sm text-green-700">Email: {userData.email}</p>
        </div>
      )}
      
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