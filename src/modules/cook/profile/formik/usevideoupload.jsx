import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { api } from "@/lib/api-client";
import { VideoSchema } from "./schema/authschema";
import { useCookVideo } from "../api/cookVideo";

export const useVideoFormik = (config = { 
  mutationConfig: { 
    onSuccess: undefined, 
    onError: undefined 
  } 
}) => {
  const navigate = useNavigate();
  
  const { mutateAsync, isLoading: isLoggingIn } = useCookVideo({
    mutationConfig: {
      onSuccess: (data) => {
        localStorage.setItem("authToken", data.token);
        api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
        navigate("/user/dashboard");
        
        if (config?.mutationConfig?.onSuccess) {
          config.mutationConfig.onSuccess(data);
        }
      },
      onError: (error) => {
        console.error("Video failed:", error);
        
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
    validationSchema: toFormikValidationSchema(VideoSchema),
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: async (values, helpers) => {
      try {
        const result = await mutateAsync(values);
        helpers.setStatus({ success: true, message: 'Video successful' });
        helpers.resetForm();
        console.log("Video successful:", result);
      } catch (err) {
        console.error("Video error:", err);
        helpers.setStatus({ success: false });
        
        if (err instanceof AxiosError && err.response) {
          const message = err.response?.data?.message || "Video failed";
          helpers.setErrors({ submit: message });
        } else {
          helpers.setErrors({ submit: "An unexpected error occurred" });
        }
      } finally {
        helpers.setSubmitting(false);
      }
    },
  });
  
  return { formik, isLoggingIn };
};