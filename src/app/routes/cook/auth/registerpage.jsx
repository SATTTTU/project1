// RegisterPage.jsx
import AuthImageSection from "@/modules/cook/auth/firstregisterpage/component/authimagesection";
import AuthSidebar from "@/modules/cook/auth/register/component/authsidebar";
import CertificateExperienceStep from "@/modules/cook/auth/register/component/certificateexperiencestep";
import DocumentUploadStep from "@/modules/cook/auth/register/component/documentuploadstep";
import StepperHeader from "@/modules/cook/auth/register/component/stepperheader";
import TermsConditionsStep from "@/modules/cook/auth/register/component/termsconditionstep";
import { validateStep } from "@/modules/cook/auth/register/component/validation";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";


export const RegisterPage = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    passwordsizephoto: null,
    citizenshipFront: null,
    citizenshipBack: null,
    certificate: null,
    experience: "",
    termsAccepted: false,
  });
  const [errors, setErrors] = useState({});
  
  const fileInputRefs = {
    passwordsizephoto: useRef(),
    citizenshipFront: useRef(),
    citizenshipBack: useRef(),
    certificate: useRef(),
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData({ ...formData, [name]: files[0] });
      clearError(name);
    }
  };

  const handleDrop = (e, fieldName) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFormData({ ...formData, [fieldName]: e.dataTransfer.files[0] });
      clearError(fieldName);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const removeFile = (fieldName) => {
    setFormData({ ...formData, [fieldName]: null });
    if (fileInputRefs[fieldName].current) {
      fileInputRefs[fieldName].current.value = "";
    }
  };

  const clearError = (fieldName) => {
    if (errors[fieldName]) {
      setErrors((prev) => ({ ...prev, [fieldName]: undefined }));
    }
  };

  const handleValidateCurrentStep = () => {
    const newErrors = validateStep(step, formData);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = (e) => {
    if (e) e.preventDefault();

    if (!handleValidateCurrentStep()) return;

    if (step === 3) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        navigate("/cook/underreview");
      }, 2000);
      return;
    }

    setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleInputChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    clearError(name);
  };

  const fileHandlingProps = {
    handleFileChange,
    handleDrop,
    handleDragOver,
    removeFile,
    fileInputRefs,
    errors,
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Left side - Image with overlay */}
      <AuthSidebar image={AuthImageSection} />

      {/* Right side - Form */}
      <div className="w-full md:w-1/2 flex flex-col py-8 overflow-y-auto">
        <div className="max-w-md mx-auto w-full px-4">
          <h1 className="text-3xl font-bold text-[#4b6c1e] mb-8">
            Sign in as Cook
          </h1>

          {/* Stepper */}
          <StepperHeader currentStep={step} totalSteps={3} />

          {/* Step 1: Upload personal documents */}
          {step === 1 && (
            <DocumentUploadStep
              formData={formData}
              fileHandlingProps={fileHandlingProps}
              prevStep={prevStep}
              nextStep={nextStep}
            />
          )}

          {/* Step 2: Upload certificate and experience */}
          {step === 2 && (
            <CertificateExperienceStep
              formData={formData}
              handleInputChange={handleInputChange}
              fileHandlingProps={fileHandlingProps}
              prevStep={prevStep}
              nextStep={nextStep}
            />
          )}

          {/* Step 3: Terms and conditions */}
          {step === 3 && (
            <TermsConditionsStep
              formData={formData}
              handleInputChange={handleInputChange}
              errors={errors}
              isLoading={isLoading}
              prevStep={prevStep}
              nextStep={nextStep}
            />
          )}
        </div>
      </div>
    </div>
  );
};