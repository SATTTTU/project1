import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { api } from "@/lib/api-client";
import { loginSchema } from "./schema/authschema";
import { useCookLogin } from "../api/cooklogin";

export const useLoginFormik = (config = {
  mutationConfig: {
    onSuccess: undefined,
    onError: undefined
  }
}) => {
  const navigate = useNavigate();
  
  const { mutateAsync, isLoading: isLoggingIn } = useCookLogin({
    mutationConfig: {
      onSuccess: (data) => {
        localStorage.setItem("authToken", data.token);
        api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
        navigate("/user/homepage");
        
        if (config?.mutationConfig?.onSuccess) {
          config.mutationConfig.onSuccess(data);
        }
      },
      onError: (error) => {
        console.error("Login failed:", error);
        
        if (config?.mutationConfig?.onError) {
          config.mutationConfig.onError(error);
        }
      },
    },
  });
  
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: toFormikValidationSchema(loginSchema),
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: async (values, helpers) => {
      try {
        const result = await mutateAsync(values);
        helpers.setStatus({ success: true, message: 'login successful' });
        helpers.resetForm();
        console.log("Login successful:", result);
      } catch (err) {
        console.error("Login error:", err);
        helpers.setStatus({ success: false });
        
        if (err instanceof AxiosError && err.response) {
          // Check for specific error messages from the backend
          const errorMessage = err.response?.data?.error || err.response?.data?.message || "Login failed";
          
          // Identify which field should display the error based on error message
          if (errorMessage.toLowerCase().includes('password')) {
            helpers.setFieldError('password', errorMessage);
          } else if (errorMessage.toLowerCase().includes('email') || errorMessage.toLowerCase().includes('user')) {
            helpers.setFieldError('email', errorMessage);
          } else {
            // Generic error goes to the password field for login form
            helpers.setFieldError('password', errorMessage);
          }
        } else {
          helpers.setFieldError('password', "An unexpected error occurred");
        }
      } finally {
        helpers.setSubmitting(false);
      }
    },
  });
  
  return { formik, isLoggingIn };
};