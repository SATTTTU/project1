import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { forgotPasswordSchema } from "./schema/authschema";
import { useForgotPassword } from "../api/forgotPassword";
import { useNavigate } from "react-router-dom";

export const useForgotPasswordFormik = () => {
  const navigate = useNavigate();
  const { mutateAsync, isLoading, isSuccess, isError, error } = useForgotPassword();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: toFormikValidationSchema(forgotPasswordSchema),
    onSubmit: async (values, helpers) => {
      try {
        const response = await mutateAsync({ email: values.email });
        
        // Based on your API response structure: {message: "...", token: {token: "..."}}
        if (response && response.token && response.token.token) {
          localStorage.setItem("resetPasswordToken", response.token.token);
          localStorage.setItem("resetPasswordEmail", values.email);
          
          // Navigate to reset password page
          navigate(`/user/resetpassword`);
        }

        helpers.setStatus({
          success: true,
          message: response.message || "Check your email for the reset link.",
        });
      } catch (err) {
        console.error("Error:", err);
        helpers.setStatus({
          success: false,
          message: err.response?.data?.message || "Failed to send reset email.",
        });
      } finally {
        helpers.setSubmitting(false);
      }
    },
  });

  return {
    formik,
    isLoading,
    isSuccess,
    isError,
    error,
  };
};