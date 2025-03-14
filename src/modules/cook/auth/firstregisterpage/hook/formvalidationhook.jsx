// hook/formvalidationhook.js
import { useState } from "react";

export const useFormValidation = (schema) => {
  const [errors, setErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  const [focusedField, setFocusedField] = useState(null);

  // Validate a single field
  const validateField = (name, value) => {
    try {
      schema.pick({ [name]: true }).parse({ [name]: value });
      setErrors(prev => ({ ...prev, [name]: undefined }));
      return true;
    } catch (error) {
      if (error.errors) {
        setErrors(prev => ({
          ...prev,
          [name]: error.errors[0].message
        }));
        return false;
      }
    }
  };

  // Validate the entire form
  const validate = (formData) => {
    try {
      schema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error.errors) {
        const newErrors = {};
        error.errors.forEach(err => {
          newErrors[err.path[0]] = err.message;
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  // Handle field focus with validation of previous field
  const handleFocus = (name, formData) => {
    // If we're switching between fields, validate the previous field
    if (focusedField && focusedField !== name) {
      validateField(focusedField, formData[focusedField]);
      setTouchedFields(prev => ({
        ...prev,
        [focusedField]: true
      }));
    }
    
    setFocusedField(name);
  };

  // Handle field blur
  const handleBlur = (name, value) => {
    setTouchedFields(prev => ({
      ...prev,
      [name]: true
    }));
    
    validateField(name, value);
  };

  return {
    errors,
    setErrors,
    touchedFields,
    focusedField,
    validate,
    validateField,
    handleFocus,
    handleBlur
  };
};