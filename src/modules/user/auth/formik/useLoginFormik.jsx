import { useFormik } from "formik";
import { signInSchema } from "../../../../modules/user/auth/formik/schema/authschema";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useUserLogin } from "../api/loginUser";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { api } from "@/lib/api-client";
import { toast } from "react-toastify"; // ✅ 

export const useLoginFormik = (config = {}) => {
  const navigate = useNavigate();
  const { mutateAsync, isLoading: isLoggingIn } = useUserLogin({
    mutationConfig: {
      onSuccess: (data) => {
        localStorage.setItem("authToken", data.token);
        api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
        navigate("/user/dashboard");

        toast.success("Login successful! 🎉"); // ✅ 
      },
      onError: (error) => {
        console.error("Login failed:", error);
        toast.error("Login failed. Please try again. ❌"); // ✅ 
      },
    },
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: toFormikValidationSchema(signInSchema),
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: async (values, helpers) => {
      try {
        const result = await mutateAsync(values);
        helpers.setStatus({ success: true, message: "Login successful" });
        helpers.resetForm();
        console.log("Login successful:", result);
        toast.success("Welcome back! 🎉"); // ✅ Show success toast

        if (config?.mutationConfig?.onSuccess) {
          config.mutationConfig.onSuccess(result);
        }
      } catch (err) {
        console.error("Login error:", err);
        helpers.setStatus({ success: false });

        let errorMessage = "An unexpected error occurred";
        if (err instanceof AxiosError && err.response) {
          errorMessage = err.response?.data?.message || "Login failed";
          helpers.setErrors({ submit: errorMessage });
        }

        toast.error(errorMessage); // ✅ Show error toast

        if (config?.mutationConfig?.onError) {
          config.mutationConfig.onError(err);
        }
      } finally {
        helpers.setSubmitting(false);
      }
    },
  });

  return { formik, isLoggingIn };
};
