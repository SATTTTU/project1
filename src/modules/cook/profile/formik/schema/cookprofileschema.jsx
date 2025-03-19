import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useprofileCook } from '@/hooks/api/useprofileCook';
import { useToast } from '@/hooks/useToast';

// Profile Schema
export const profileSchema = Yup.object().shape({
  // Personal Information
  fullName: Yup.string().required('Full name is required'),
  bio: Yup.string().max(500, 'Bio must be less than 500 characters'),
  profileImage: Yup.mixed(),
  phone: Yup.string()
    .matches(/^\+?[0-9]{10,15}$/, 'Invalid phone number')
    .required('Phone number is required'),
  
  // Cuisine Specialties
  cuisineSpecialties: Yup.array()
    .of(Yup.string())
    .min(1, 'Select at least one cuisine specialty'),
  
  // Experience
  yearsOfExperience: Yup.number()
    .positive('Years must be positive')
    .required('Years of experience is required'),
  
  // Skills
  skills: Yup.array()
    .of(Yup.string())
    .min(1, 'Add at least one skill'),
  
  // Qualifications
  qualifications: Yup.array().of(
    Yup.object().shape({
      title: Yup.string().required('Qualification title is required'),
      institution: Yup.string().required('Institution is required'),
      year: Yup.number().required('Year is required')
    })
  ),
  
  // Account Settings
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  currentPassword: Yup.string()
    .min(8, 'Password must be at least 8 characters'),
  newPassword: Yup.string()
    .min(8, 'Password must be at least 8 characters'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
});

// Custom hook for Formik integration with API
export const useProfileForm = (initialValues) => {
  const { toast } = useToast();
  const { mutate: updateProfile, isLoading } = useprofileCook({
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