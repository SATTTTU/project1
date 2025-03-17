import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useUpdateProfile } from "../api/updateProfile";
import { useNavigate } from "react-router-dom";
import { profileSchema } from "./schema/updateSchema";

export const useProfileFormik = () => {
  const navigate = useNavigate();
  const { mutateAsync, isLoading } = useUpdateProfile();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      image: null, // ✅ Set as null initially
    },
    validationSchema: toFormikValidationSchema(profileSchema),
    validateOnBlur: true,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("email", values.email);
        formData.append("phone", values.phone);

        // ✅ Ensure image is a File before appending
        if (values.image instanceof File) {
          formData.append("image", values.image);
        } else {
          setErrors({ image: "Please select a valid image file." });
          return;
        }

        await mutateAsync(formData);
        navigate("/user/profile");
      } catch (error) {
        setErrors(error.response?.data || { name: "Update failed" });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return { formik, isLoading };
};
