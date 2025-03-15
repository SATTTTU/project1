import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { forgotPasswordSchema } from "../schema/adminformSchema";
import { useAdminForgotPassword } from "../api/forgot-Password";

export const useAdminForgotPasswordFormik = () => {
  const { mutateAsync, isLoading, isError, error, isSuccess } = useAdminForgotPassword();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: toFormikValidationSchema(forgotPasswordSchema), // Use Zod validation schema with Formik
    onSubmit: async (values, helpers) => {
      try {
        await mutateAsync(values); // Trigger forgot password API
        formik.resetForm(); // Reset form after successful submission
      } catch (err) {
        // Handle error and set form error
        helpers.setErrors({
          submit: err?.response?.data?.message || "An error occurred while requesting a password reset.",
        });
        console.error(err);
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
