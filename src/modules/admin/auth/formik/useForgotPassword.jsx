import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { forgotPasswordSchema } from "../schema/adminformSchema";
import { useAdminForgotPassword } from "../api/forgot-Password";
import { toast } from "react-toastify";
import { useState } from "react";

export const useAdminForgotPasswordFormik = () => {
  const { mutateAsync, isLoading, isError, error, isSuccess } = useAdminForgotPassword();
  const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: toFormikValidationSchema(forgotPasswordSchema), // Use Zod validation schema with Formik
    onSubmit: async (values, helpers) => {
      try {
        const response = await mutateAsync(values); // Trigger forgot password API
        
        // Display success message from the server response
        toast.success(response?.message || "Password reset request sent successfully.");
        formik.resetForm(); // Reset form after successful submission
        setIsRegistrationSuccess(true);
      } catch (err) {
        // Extract error message from the server response
        const errorMessage =
          err?.response?.data?.message ||
          (err?.response?.data?.errors
            ? Object.values(err.response.data.errors).flat().join(", ")
            : "An error occurred while requesting a password reset.");

        // Set formik errors and show toast error
        helpers.setErrors({ submit: errorMessage });
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
    isRegistrationSuccess,
  };
};
