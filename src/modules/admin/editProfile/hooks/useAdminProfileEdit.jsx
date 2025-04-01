import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { profileEditSchema } from "../schema/editprofile";
import { useAdminProfile } from "../api/getprofile";
import { useAdminProfileEdit } from "../api/editprofile";
import { toast } from "react-toastify";

export const useAdminProfileEditFormik = () => {
  const { mutateAsync: editProfile, isLoading: isEditing } = useAdminProfileEdit();
  const { mutateAsync: fetchProfile, isLoading: isFetching } = useAdminProfile();
  const [initialValues, setInitialValues] = useState(null);
  
  // Function to get the full image URL
  const getFullImageUrl = (imagePath) => {
    

    // If no image path, return placeholder
    if (!imagePath) return "/api/placeholder/80/80";
  
    // If already a full URL, return as is
    if (imagePath.startsWith("http")) return imagePath;
  
    // Try multiple methods to get bucket URL
    const bucketUrl = 
      import.meta.env.VITE_BUCKET_URL || 
      import.meta.env.BUCKET_URL || 
      import.meta.env.VITE_BUCKET_URL || 
      

    // Log the resolved bucket URL
    console.log("Resolved Bucket URL:", bucketUrl);
  
    // If no bucket URL found, return placeholder
    if (!bucketUrl) {
      console.error("No bucket URL found in environment variables");
      return "/api/placeholder/80/80";
    }
  
    // Construct and log final image URL
    const finalImageUrl = `${bucketUrl.endsWith("/") ? bucketUrl : bucketUrl + "/"}${imagePath}`;
    console.log("Final Constructed Image URL:", finalImageUrl);
  
    return finalImageUrl;
  };

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profileData = await fetchProfile(); // Get data from API
        setInitialValues({
          name: profileData?.name || "John Doe",
          email: profileData?.email || "johndoe@example.com",
          mobile: profileData?.mobile || "",
          image: profileData?.image_url 
            ? getFullImageUrl(profileData.image_url) 
            : "/api/placeholder/200/200",
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
      name: "John Doe",
      email: "johndoe@example.com",
      mobile: "",
      image: "/api/placeholder/200/200",
      isEditing: false,
    },
    enableReinitialize: true, // Update form when initialValues change
    validationSchema: toFormikValidationSchema(profileEditSchema),
    onSubmit: async (values, helpers) => {
      try {
        // Create FormData for file upload
        const formData = new FormData();
        
        // Add text fields
        formData.append('name', values.name);
        formData.append('mobile', values.mobile);
        
        // Only append the image if it's a File object
        if (values.image instanceof File) {
          formData.append('image', values.image);
          console.log("Uploading file:", values.image.name, values.image.type);
        }
        
        // Submit the form
        await editProfile(formData);
        toast.success("Successfully updated profile");
      } catch (err) {
        console.error("Update error:", err?.response?.data || err);
        helpers.setErrors({
          submit: err?.response?.data?.message || "An error occurred"
        });
        toast.error("Something went wrong");
      }
    },
  });
  
  return { formik, isLoading: isFetching || isEditing };
};