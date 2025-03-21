import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { resetPasswordSchema } from "../formik/schema/authschema"; // Assuming you have this schema
import { useNavigate, useLocation } from "react-router-dom";
import { useResetPassword } from "../api/resetPassword";

export const useResetPasswordFormik = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get token from URL query parameters
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');
  
  // Get email from query parameters if available
  const email = queryParams.get('email');
  
  const { mutateAsync, isLoading, isSuccess, isError, error } = useResetPassword();

  const formik = useFormik({
    initialValues: {
      password: "",
      password_confirmation: "",
    },
    validationSchema: toFormikValidationSchema(resetPasswordSchema),
    onSubmit: async (values, helpers) => {
      try {
        // Include token and email in the request
        const result = await mutateAsync({
          token: token,
          email: email, // Include email if your API requires it
          password: values.password,
          password_confirmation: values.password_confirmation
        });
        
        console.log("Reset password response:", result);
        
        helpers.setStatus({ 
          success: true, 
          message: "Password reset successful!" 
        });
        
        // Navigate to login page after successful reset
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } catch (err) {
        console.error("Error:", err);
        helpers.setStatus({ 
          success: false, 
          message: err.response?.data?.message || "Failed to reset password. Please try again." 
        });
      } finally {
        helpers.setSubmitting(false);
      }
    }
  });

  return { 
    formik, 
    isLoading, 
    isSuccess, 
    isError, 
    error,
    token, // Return token so the component can check if it exists
    email 
  };
};