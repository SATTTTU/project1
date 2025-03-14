import { useFormik } from "formik";
import { forgotPasswordSchema } from "../schema/adminformSchema";
import { useAdminForgotPassword } from "../api/forgot-Password";

export const useAdminForgotPasswordFormik = () => {
  const { mutateAsync, isLoading, isError, error, isSuccess } = useAdminForgotPassword();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validate: (values) => {
      try {
        forgotPasswordSchema.parse(values);
        return {}; // No errors
      } catch (err) {
        const errors = {};
        err.errors.forEach((issue) => {
          errors[issue.path[0]] = issue.message;
        });
        return errors;
      }
    },
    validateOnBlur: true,
    onSubmit: async (values) => {
      try {
        await mutateAsync(values); // Trigger forgot password API
        formik.resetForm();
      } catch (err) {
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
