// utils/validation.js
export const validateStep = (step, formData) => {
  const errors = {};
  switch (step) {
    case 1:
      // Validate Document Upload Step
      if (!formData.passwordsizephoto) {
        errors.passwordsizephoto = "Passport size photo is required";
      }
      if (!formData.citizenshipFront) {
        errors.citizenshipFront = "Citizenship front side is required";
      }
      if (!formData.citizenshipBack) {
        errors.citizenshipBack = "Citizenship back side is required";
      }
      break;
    case 2:
      // Validate Certificate and Experience Step
      // Certificate is now optional, so no validation for it
      
      // Still validate experience
      if (!formData.experience || formData.experience.trim() === "") {
        errors.experience = "Experience details are required";
      } else if (formData.experience.length < 50) {
        errors.experience = "Please provide more details about your experience (minimum 50 characters)";
      }
      break;
    case 3:
      // Validate Terms and Conditions Step
      if (!formData.termsAccepted) {
        errors.termsAccepted = "You must accept the terms and conditions to continue";
      }
      break;
    default:
      break;
  }
  return errors;
};