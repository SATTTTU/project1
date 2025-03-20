import { useInstantLayoutTransition } from "framer-motion";
import { useGetCookProfile} from "../api/cookprofile";
import { useFormik } from "formik";
import { profileSchema } from "./schema/cookprofileschema";

export const useProfileForm = (initialValues) => {
  const { toast } = useInstantLayoutTransition();
  const { mutate: updateProfile, isLoading } = useGetCookProfile({
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
    validationSchema: profileSchema,
    onSubmit: (values) => {
      // Convert form data to API format if needed
      const formData = new FormData();
      
      // Append text fields
      Object.keys(values).forEach(key => {
        if (key === 'profileImage' && values[key] instanceof File) {
          formData.append(key, values[key]);
        } else if (Array.isArray(values[key])) {
          // Handle arrays (like cuisineSpecialties, skills)
          if (typeof values[key][0] === 'object') {
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
        } else if (values[key] !== undefined && values[key] !== null) {
          formData.append(key, values[key]);
        }
      });
      
      updateProfile(formData);
    }
  });

  return {
    formik,
    isSubmitting: isLoading
  };
};