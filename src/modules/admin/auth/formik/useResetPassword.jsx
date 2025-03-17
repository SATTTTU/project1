import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { toast } from "react-toastify";
import { useAdminResetPassword } from "../api/create-newPassword";
import { adminResetPasswordSchema } from "../schema/adminformSchema";

export const useResetPasswordFormik = () => {
  const { mutateAsync, isLoading, isError, error, isSuccess } = useAdminResetPassword();

  const formik = useFormik({
    initialValues: {
      oldpassword: "", // Updated to match backend expectation
      newpassword: "",
      confirmpassword: "",
    },
    validationSchema: toFormikValidationSchema(adminResetPasswordSchema), // Uses Zod validation schema
    onSubmit: async (values, { resetForm, setErrors }) => {
      try {
        // Send request to backend
        const response = await mutateAsync({
          oldpassword: values.oldpassword,
          newpassword: values.newpassword,
          confirmpassword: values.confirmpassword,
        });

        // Display success message from the server response
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
