import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { profileEditSchema } from "../schema/editprofile";
import { useAdminProfileEdit } from "../api/editprofile";

export const useAdminProfileEditFormik = () => {
  const { mutateAsync, isLoading } = useAdminProfileEdit();

  const formik = useFormik({
    initialValues: {
      name: "John Doe",
      email: "johndoe@example.com",
      mobile: "",
      image: "/api/placeholder/200/200",
      isEditing: false,
    },
    validationSchema: toFormikValidationSchema(profileEditSchema),
    onSubmit: async (values, helpers) => {
      try {
        await mutateAsync(values);
        // No need to reset the form here as it will lose the current values
      } catch (err) {
        helpers.setErrors({ submit: err?.response?.data?.message || "An error occurred" });
      }
    },
  });

  return { formik, isLoading };
};
