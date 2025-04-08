// useCookDocumentFormik.js (Updated version of useDocumentUpload.js) 
// This is a modified version of the code from your first document to ensure cook_id is correctly handled
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { documentSchema } from "./schema/authschema";
import { useCookRegister } from "../api/cookregister";

export const useCookDocumentFormik = (config = {}) => {
  const { mutateAsync, isLoading: isRegistering } = useCookRegister({
    mutationConfig: config?.mutationConfig,
  });

  const formik = useFormik({
    initialValues: {
      passwordsizedphoto: null,
      citizenshipFront: null,
      citizenshipBack: null,
      certificates: [],
      experienceLetters: '',
      termsAccepted: false,
      ...(config?.initialValues || {}),
    },
    validationSchema: toFormikValidationSchema(documentSchema),
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: async (values, helpers) => {
      try {
        // Create a FormData object to send files to the server
        const formData = new FormData();
        
        // Map the frontend field names to the backend expected names
        if (values.passwordsizedphoto) {
          formData.append("passport_photo", values.passwordsizedphoto);
        }
        
        if (values.citizenshipFront) {
          formData.append("citizenship_front", values.citizenshipFront);
        }
        
        if (values.citizenshipBack) {
          formData.append("citizenship_back", values.citizenshipBack);
        }
        
        // Get cook_id from localStorage - UPDATED to check both potential keys
        const cookId = localStorage.getItem('cook_id') || 
                       localStorage.getItem('cookClientId') || 
                       sessionStorage.getItem('cook_id') ||
                       values.clientId; // Also check if it was passed directly in values
                       
        if (cookId) {
          formData.append("cook_id", cookId);
          // Also store it in localStorage for future use, ensuring consistency
          localStorage.setItem('cook_id', cookId);
        } else {
          // If cook_id is not available, show an error
          helpers.setErrors({ submit: "Cook ID is required. Please complete registration first." });
          toast.error("⚠️ Cook ID is missing. Please complete the initial registration step.", {
            position: "top-right",
            autoClose: 3000,
          });
          return;
        }
        
        // Append certificates if any
        if (values.certificates && values.certificates.length > 0) {
					// values.certificates.forEach((file, index) => {
					// formData.append(`certificates[${index}]`, file);
					 formData.append(`certificates`, values.certificates);

					// });
				}

				// Append experience letters if any
				if (values.experienceLetters) {
					// values.experienceLetters.forEach((file, index) => {
					// formData.append(`experience_letters[${index}]`, file);
					formData.append(`experienceLetters`, values.experienceLetters);
					// });
				}
        
        formData.append("terms_accepted", values.termsAccepted);
        
        // Send the form data to the server
        const result = await mutateAsync(formData);
        
        helpers.setStatus({ success: true, message: "Registration successful" });
        helpers.resetForm();
        
        toast.success("🎉 Document submission successful!", {
          position: "top-right",
          autoClose: 3000,
        });
        
        console.log("Document submission successful:", result);
        
        if (config?.mutationConfig?.onSuccess) {
          config.mutationConfig.onSuccess(result);
        }
      } catch (err) {
        console.error("Document submission error:", err);
        
        if (err?.response?.data?.errors) {
          const errors = err.response.data.errors;
          
          // Map the backend error fields to frontend field names for display
          const fieldMapping = {
            passport_photo: 'passwordsizedphoto',
            citizenship_front: 'citizenshipFront',
            citizenship_back: 'citizenshipBack'
          };
          
          // Set form errors based on API response
          Object.keys(errors).forEach(key => {
            if (fieldMapping[key]) {
              helpers.setFieldError(fieldMapping[key], errors[key][0]);
            }
          });
          
          toast.error(`⚠️ ${err.response.data.message || "Validation failed"}`, {
            position: "top-right",
            autoClose: 3000,
          });
        } else if (err?.response) {
          // const status = err.response?.status;
          const message = err.response?.data?.message || "Document submission failed";
          
          helpers.setErrors({ submit: message });
          
          toast.error(`⚠️ ${message}`, {
            position: "top-right",
            autoClose: 3000,
          });
        } else {
          helpers.setErrors({ submit: "An unexpected error occurred" });
          
          toast.error("❌ An unexpected error occurred. Please try again later.", {
            position: "top-right",
            autoClose: 3000,
          });
        }
        
        if (config?.mutationConfig?.onError) {
          config.mutationConfig.onError(err);
        }
      } finally {
        helpers.setSubmitting(false);
      }
    },
  });

  return { formik, isRegistering };
};