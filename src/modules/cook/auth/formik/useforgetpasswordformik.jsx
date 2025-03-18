import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { forgotPasswordSchema } from "./schema/authschema";
import { useForgetPasswordCook } from "../api/cookforgetpassword";

export const useForgotPasswordFormik = () => {
  
  const { 
    mutateAsync, 
    isLoading, 
    isSuccess, 
    isError, 
    error: apiError 
  } = useForgetPasswordCook();
  
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: toFormikValidationSchema(forgotPasswordSchema),
    onSubmit: async (values, helpers) => {
      try {
        const result = await mutateAsync(values);
        console.log("Forgot password response:", result);
        
        // Let the component handle navigation based on isSuccess
        helpers.setStatus({ 
          success: true, 
          message: "Password reset email sent! Check your inbox." 
        });
      } catch (err) {
        console.error("Error:", err);
        helpers.setStatus({ 
          success: false, 
          message: "Failed to send reset email. Try again." 
        });
      } finally {
        helpers.setSubmitting(false);
      }
    }
  });

  // Extract the error message from apiError
  const errorMessage = apiError ? 
    (apiError.response?.data?.message || apiError.message || "An error occurred") : 
    "";

  return { 
    formik, 
    isLoading, 
    isSuccess, 
    isError, 
    error: errorMessage,
    formStatus: formik.status
  };
};