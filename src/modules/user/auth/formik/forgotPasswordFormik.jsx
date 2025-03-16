import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { forgotPasswordSchema } from "../formik/schema/authschema";
import { useNavigate } from "react-router-dom";

import { useForgotPassword } from "../api/forgotPassword"; // API hook

export const useForgotPasswordFormik = () => {
  const navigate=useNavigate()
  const { mutateAsync, isLoading, isSuccess, isError, error } = useForgotPassword();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: toFormikValidationSchema(forgotPasswordSchema),
    onSubmit: async (values, helpers) => {
      try {
        const result = await mutateAsync(values);
        navigate("/user/verification")
        console.log("Forgot password response:", result);
        
        helpers.setStatus({ success: true, message: "Password reset email sent! Check your inbox." });
      } catch (err) {
        console.error("Error:", err);
        helpers.setStatus({ success: false, message: "Failed to send reset email. Try again." });
      } finally {
        helpers.setSubmitting(false);
      }
    }
    
  });

  return { formik, isLoading, isSuccess, isError, error };
};
