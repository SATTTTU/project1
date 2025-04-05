import { useProfile } from "../api/getProfile";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter"; // Zod to Formik adapter
import { toast } from "react-toastify";
import { UpdateProfile } from "../api/updateProfile";
import { profileEditSchema } from "./schema/updateSchema"; // Import the Zod schema

export const useUserProfileEditFormik = () => {
  const { mutateAsync: editProfile, isLoading: isEditing } = UpdateProfile();
  const { data: profileData, isLoading: isFetching } = useProfile();

  const formik = useFormik({
    initialValues: {
      name: profileData?.name || "",
      email: profileData?.email || "",
      phone: profileData?.phone || "",
      image: profileData?.image_url || "",
    },
    enableReinitialize: true,
    validationSchema: toFormikValidationSchema(profileEditSchema), // Use Zod validation schema
    onSubmit: async (values, helpers) => {
      try {
        const formData = new FormData();

        // Only send fields that have changed
        if (values.name !== profileData?.name) {
          formData.append("name", values.name);
        }

        if (values.email !== profileData?.email) {
          formData.append("email", values.email);
        }

        if (values.phone !== profileData?.phone) {
          formData.append("phone", values.phone);
        }

        // If a new image is selected, send it as well
        if (values.image instanceof File) {
          formData.append("image", values.image);
        }

        if (formData.has("name") || formData.has("email") || formData.has("phone") || formData.has("image")) {
          // Make the API request only if there are changes
          await editProfile(formData);
          toast.success("Successfully updated profile");
        } else {
          toast.info("No changes made");
        }
      } catch (err) {
        if (err?.response?.data?.errors) {
          // Map API errors to Formik field errors
          helpers.setErrors({
            name: err.response.data.errors?.name || "",
            email: err.response.data.errors?.email || "",
            phone: err.response.data.errors?.phone || "",
            submit: err?.response?.data?.message || "An error occurred",
          });
        } else {
          toast.error("Something went wrong");
        }
      }
    },
  });

  return { formik, isLoading: isFetching || isEditing };
};
