import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useAdminResetPassword } from "../api/create-newPassword";
import { resetPasswordSchema } from "../schema/adminformSchema";

export const useResetPasswordFormik = () => {
  const { mutateAsync, isLoading, isError, error, isSuccess } = useAdminResetPassword();

  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: toFormikValidationSchema(resetPasswordSchema), 
    onSubmit: async (values, { resetForm, setErrors }) => {
      try {
        await mutateAsync(values);
        alert("Password reset successful!");
        resetForm(); 
      } catch (err) {
        // Handle errors
        setErrors({
          submit: err?.response?.data?.message || "An error occurred while resetting the password.",
        });
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
