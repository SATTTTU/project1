import { useInstantLayoutTransition } from "framer-motion";
import { useUpdateCookProfile } from "../api/cookprofile";
import { useFormik } from "formik";
import { VideoUploadSchema } from "./schema/videoschema";

// Custom hook to handle form logic and API integration
export const useProfileForm = (initialValues) => {
  const { toast } = useInstantLayoutTransition();
  
  const { mutate: updateProfile, isLoading } = useUpdateCookProfile({
    onSuccess: () => {
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully",
        variant: "success",
      });
    },
    onError: (error) => {
      toast({
        title: "Update failed",
        description: error.message || "Failed to update profile",
        variant: "destructive",
      });
    }
  });

  const formik = useFormik({
    initialValues,
    validate: VideoUploadSchema,
    onSubmit: (values) => {
      // Convert form data to API format
      const formData = new FormData();
      
      // Append text fields
      Object.keys(values).forEach(key => {
        if (key === 'profileImage' && values[key] instanceof File) {
          formData.append(key, values[key]);
        } else if (Array.isArray(values[key])) {
          // Handle arrays (like cuisineSpecialties, skills)
          if (values[key].length > 0 && typeof values[key][0] === 'object') {
            // For array of objects like qualifications
            formData.append(key, JSON.stringify(values[key]));
          } else {
            // For array of strings
            values[key].forEach((item, index) => {
              formData.append(`${key}[${index}]`, item);
            });
          }
        } else if (typeof values[key] === 'object' && values[key] !== null) {
          formData.append(key, JSON.stringify(values[key]));
        } else if (values[key] !== undefined && values[key] !== null && values[key] !== '') {
          // Only append non-empty values
          formData.append(key, values[key]);
        }
      });
      
      // Send the update to the API
      updateProfile(formData);
    }
  });

  return {
    formik,
    isSubmitting: isLoading
  };
};