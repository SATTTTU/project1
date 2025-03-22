import { useProfile } from "../api/getProfile";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { toast } from "react-toastify";
import { UpdateProfile } from "../api/updateProfile";
import { profileEditSchema } from "./schema/updateSchema";

export const useAdminProfileEditFormik = () => {
  const { mutateAsync: editProfile, isLoading: isEditing } = UpdateProfile();
  const { data: profileData, isLoading: isFetching } = useProfile(); // ✅ Correctly use `useQuery`

  const getFullImageUrl = (imagePath) => {
    if (!imagePath) return "/api/placeholder/200/200";
    if (imagePath.startsWith("http")) return imagePath;
    const storageUrl = import.meta.env.VITE_APP_API_URL.endsWith("/")
      ? `${import.meta.env.VITE_APP_API_URL}storage/`
      : `${import.meta.env.VITE_APP_API_URL}/storage/`;
    return `${storageUrl}${imagePath}`;
  };

  const formik = useFormik({
    initialValues: {
      name: profileData?.name || "John Doe",
      email: profileData?.email || "johndoe@example.com",
      mobile: profileData?.mobile || "",
      image: profileData?.image_url
        ? getFullImageUrl(profileData.image_url)
        : "/api/placeholder/200/200",
    },
    enableReinitialize: true,
    validationSchema: toFormikValidationSchema(profileEditSchema),
    onSubmit: async (values, helpers) => {
      try {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("mobile", values.mobile);
        if (values.image instanceof File) {
          formData.append("image", values.image);
        }
        await editProfile(formData);
        toast.success("Successfully updated profile");
      } catch (err) {
        console.error("Update error:", err?.response?.data || err);
        helpers.setErrors({
          submit: err?.response?.data?.message || "An error occurred",
        });
        toast.error("Something went wrong");
      }
    },
  });

  return { formik, isLoading: isFetching || isEditing };
};
