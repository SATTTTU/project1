import { useFormik } from "formik";
import { resetPasswordSchema } from "../schema/adminformSchema";
import { useAdminResetPassword } from "../api/create-newPassword";

export const useResetPasswordFormik = () => {
  // Use your custom hook to get the mutation
  const { mutateAsync, isLoading, isError, error, isSuccess } = useAdminResetPassword();

  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
      confirmPassword: "",
    },
    validate: (values) => {
      try {
        resetPasswordSchema.parse(values);
        return {}; // No errors
      } catch (err) {
        const errors = {};
        if (err.errors) {
          err.errors.forEach((issue) => {
            errors[issue.path[0]] = issue.message;
          });
        } else {
          console.error("Unexpected error during validation:", err);
        }
        return errors;
      }
    },
    validateOnBlur: true,
    onSubmit: async (values, { resetForm }) => {
      try {
        await mutateAsync(values);
        alert("Password reset successful!");
        resetForm();
      } catch (err) {
        console.error("Password reset error:", err);
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
