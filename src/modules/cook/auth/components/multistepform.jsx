import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { documentSchema } from '../formik/schema/authschema';
import { CitizenshipUploadStep } from './citizenshipupload';
import CertificatesStep from './certificates';
import TermsStep from './termsandconditions';
import Stepper from './stepper';

// Import validation schema


const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    citizenshipFront: null,
    citizenshipBack: null,
    certificates: [],
    experienceLetters: [],
    termsAccepted: false
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form validation
  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      // Validate citizenship documents
      if (documentSchema.citizenshipFront.validate(formData.citizenshipFront)) {
        newErrors.citizenshipFront = documentSchema.citizenshipFront.validate(formData.citizenshipFront);
      }
      
      if (documentSchema.citizenshipBack.validate(formData.citizenshipBack)) {
        newErrors.citizenshipBack = documentSchema.citizenshipBack.validate(formData.citizenshipBack);
      }
    } else if (step === 3) {
      // Validate terms acceptance
      if (documentSchema.termsAccepted.validate(formData.termsAccepted)) {
        newErrors.terms = documentSchema.termsAccepted.validate(formData.termsAccepted);
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
    }
  };
  
  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };
  
  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user updates the field
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateStep(currentStep)) {
      setIsSubmitting(true);
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Reset form or redirect after successful submission
        alert('Form submitted successfully!');
        
        // Reset form
        setFormData({
          citizenshipFront: null,
          citizenshipBack: null,
          certificates: [],
          experienceLetters: [],
          termsAccepted: false
        });
        setCurrentStep(1);
      } catch (error) {
        console.error('Submission error:', error);
        alert('Failed to submit form. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <CitizenshipUploadStep 
            formData={formData}
            onChange={handleChange}
            errors={errors}
          />
        );
      case 2:
        return (
          <CertificatesStep 
            formData={formData}
            onChange={handleChange}
            errors={errors}
          />
        );
      case 3:
        return (
          <TermsStep 
            formData={formData}
            onChange={handleChange}
            errors={errors}
          />
        );
      default:
        return null;
    }
  };
  
  const isLastStep = currentStep === 3;
  
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <Stepper currentStep={currentStep} steps={['Citizenship', 'Certificates', 'Terms']} />
      
      <form onSubmit={handleSubmit} className="mt-8">
        {renderStep()}
        
        <div className="flex justify-between mt-8">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={handlePrevious}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              disabled={isSubmitting}
            >
              Back
            </button>
          )}
          
          {isLastStep ? (
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
              {!isSubmitting && <ChevronRight className="ml-1 h-4 w-4" />}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNext}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center"
              disabled={isSubmitting}
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