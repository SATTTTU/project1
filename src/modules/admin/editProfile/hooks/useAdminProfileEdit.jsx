import { toast } from "react-toastify";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { profileEditSchema } from "../schema/editprofile";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useAdminProfileEdit } from "../api/editprofile";
import { useAdminProfile } from "../api/getprofile";

export const useAdminProfileEditFormik = () => {
  const { mutateAsync: editProfile, isLoading: isEditing } = useAdminProfileEdit();
  const { mutateAsync: fetchProfile, isLoading: isFetching } = useAdminProfile();
  const [initialValues, setInitialValues] = useState(null);
  
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profileData = await fetchProfile(); // Get data from API
        setInitialValues({
          name: profileData?.name || "John Doe",
          email: profileData?.email || "johndoe@example.com",
          mobile: profileData?.mobile || "",
          // Store image URL for display
          imagePreview: profileData?.image || "/api/placeholder/200/200",
          image: null, // No file selected initially
          isEditing: false,
        });
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    };
    
    loadProfile();
  }, [fetchProfile]);
  
  const formik = useFormik({
    initialValues: initialValues || {
      name: "",
      mobile: "",
      imagePreview: "/api/placeholder/200/200",
      image: null,
      isEditing: false,
    },
    enableReinitialize: true, // Update form when initialValues change
    validationSchema: toFormikValidationSchema(profileEditSchema),
    onSubmit: async (values, helpers) => {
      try {
        // Create FormData for file upload
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("mobile", values.mobile);
        
        // Only append image if a new one was selected
        if (values.image instanceof File) {
          formData.append("image", values.image);
        }
        
        await editProfile(formData);
        toast.success("Successfully updated profile");
      } catch (err) {
        helpers.setErrors({ submit: err?.response?.data?.message || "An error occurred" });
        toast.error("Something went wrong");
      }
    },
  });
  
  return { formik, isLoading: isFetching || isEditing };
};