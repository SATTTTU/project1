import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/context/useAuth";
import { useUserLogin } from "../api/loginUser";
import { signInSchema } from "./schema/authschema";

export const useLoginFormik = () => {
  const { mutateAsync, isLoading, isError, error, isSuccess } = useUserLogin();
  const navigate = useNavigate();
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: toFormikValidationSchema(signInSchema), 
    onSubmit: async (values, helpers) => {
      try {
        const response = await mutateAsync(values);
    
        if (!response.token) {
          throw new Error("No token received from server");
        }
    
        await login({ type: "user" }, response.token);
        toast.success("Login successfully");
        formik.resetForm();
        navigate("/dashboard");
    
      } catch (err) {
        console.error("Login Error:", err);
    
        const errorData = err?.response?.data;
    
        if (errorData?.errors) {
          const fieldErrors = errorData.errors;
          Object.entries(fieldErrors).forEach(([field, messages]) => {
            if (Array.isArray(messages) && messages.length > 0) {
              helpers.setFieldError(field, messages[0]);
            }
          });
        } else if (errorData?.error) {
          if (errorData.error.toLowerCase().includes("password")) {
            helpers.setFieldError("password", errorData.error);
          } else {
            helpers.setErrors({ submit: errorData.error });
          }
          toast.error(errorData.error);
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      }
    }
    
  });

  return {
    formik,
    isLoading,
    isError,
    error,
    isSuccess,
  };
};
