import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { toast } from "react-toastify";
import { useAdminResetPassword } from "../api/create-newPassword";
import { adminResetPasswordSchema } from "../schema/adminformSchema";

export const useResetPasswordFormik = () => {
  const { mutateAsync, isLoading, isError, error, isSuccess } = useAdminResetPassword();

  const formik = useFormik({
    initialValues: {
      currentPassword: "", // Renamed to match the field in the schema
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: toFormikValidationSchema(adminResetPasswordSchema), // Uses Zod validation schema
    onSubmit: async (values, { resetForm, setErrors }) => {
      try {
        // Ensure the form values have the correct field names: currentPassword, newPassword, confirmPassword
        await mutateAsync({
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
          confirmPassword: values.confirmPassword,
        });

        toast.success("Successfully reset the password");
        resetForm();
      } catch (err) {
        // Handle errors, set appropriate error messages
        setErrors({
          submit: err?.response?.data?.message || "An error occurred while resetting the password.",
        });
        console.error("Password reset error:", err);
        toast.error("Password reset error");
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
