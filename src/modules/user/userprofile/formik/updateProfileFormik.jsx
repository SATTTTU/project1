import { useProfile } from "../api/getProfile";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { toast } from "react-toastify";
import { UpdateProfile } from "../api/updateProfile";
import { profileEditSchema } from "./schema/updateSchema";

export const useUserProfileEditFormik = () => {
  const { mutateAsync: editProfile, isLoading: isEditing } = UpdateProfile();
  const { data: profileData, isLoading: isFetching } = useProfile(); 

  const formik = useFormik({
    initialValues: {
      name: profileData?.name || "",
      email: profileData?.email || "",
      mobile: profileData?.mobile || "",
      image: profileData?.image_url || "",
    },
    enableReinitialize: true,
    validationSchema: toFormikValidationSchema(profileEditSchema),
    onSubmit: async (values, helpers) => {
      try {
        const formData = new FormData();

        // Append only if the field has a non-empty value
        if (values.name.trim()) {
          formData.append("name", values.name.trim());
        }
        if (values.email.trim()) {
          formData.append("email", values.email.trim());
        }
        if (values.mobile.trim()) {
          formData.append("mobile", values.mobile.trim());
        }
        if (values.image instanceof File) {
          formData.append("image", values.image);
        }

        // Prevent empty submission
        if ([...formData.keys()].length === 0) {
          toast.warning("Nothing to update.");
          return;
        }

        await editProfile(formData);
        toast.success("Successfully updated profile");
      } catch (err) {
        helpers.setErrors({
          submit: err?.response?.data?.message || "An error occurred",
        });
        toast.error("Something went wrong");
      }
    },
  });

  return { formik, isLoading: isFetching || isEditing };
};
