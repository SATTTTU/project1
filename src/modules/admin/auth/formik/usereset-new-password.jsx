import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { toast } from "react-toastify";
import { adminnewResetPasswordSchema } from "../schema/adminformSchema";
import { useAdminNewResetPassword } from "../api/reset-new-password";

export const useNewResetPasswordFormik = () => {
  const { mutateAsync, isLoading, isError, error, isSuccess } = useAdminNewResetPassword();

  const formik = useFormik({
    initialValues: {
      email: "",
      newpassword: "",
      confirmpassword: "",
    },
    validationSchema: toFormikValidationSchema(adminnewResetPasswordSchema), 
    onSubmit: async (values, { resetForm, setErrors }) => {
      try {
        // Send request to backend
        const response = await mutateAsync({
          email: values.email,
          newpassword: values.newpassword,
          confirmpassword: values.confirmpassword,
        });

        // Display success message
        toast.success(response?.message || "Password reset successfully.");
        resetForm();
      } catch (err) {
        // Extract error message from the server response
        const errorMessage =
          err?.response?.data?.message ||
          (err?.response?.data?.errors
            ? Object.values(err.response.data.errors).flat().join(", ")
            : "An error occurred while resetting the password.");

        setErrors({ submit: errorMessage });
        console.error("Password reset error:", err);
        toast.error(errorMessage);
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
