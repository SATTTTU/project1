import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { signInSchema } from "../schema/adminformSchema";
import { useAdminLogin } from "../api/adminlogin";

export const useAdminLoginFormik = () => {
  const { mutateAsync, isLoading, isError, error, isSuccess } = useAdminLogin();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: toFormikValidationSchema(signInSchema), // Use zod-formik-adapter for validation
    onSubmit: async (values, helpers) => {
      try {
        await mutateAsync(values);
        formik.resetForm();
      } catch (err) {
        helpers.setErrors({ submit: err?.response?.data?.message || "An error occurred" });
      }
    },
  });

  return {
    formik,
    isLoading,
    isError,
    error,
    isSuccess,
  };
};
