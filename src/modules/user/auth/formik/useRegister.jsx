import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { AxiosError } from "axios";
import { signUpSchema } from "./schema/authschema";
import { useUserRegister } from "../api/registerUser";

export const useUserRegisterFormik = (config = {}) => {
  const { mutateAsync, isLoading: isRegistering } = useUserRegister({
    mutationConfig: config?.mutationConfig,
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: toFormikValidationSchema(signUpSchema),
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: async (values, helpers) => {
      try {
        const result = await mutateAsync(values);
        helpers.setStatus({ success: true, message: 'Registration successful' });
        helpers.resetForm();
        console.log("Registration successful:", result);
        
        if (config?.mutationConfig?.onSuccess) {
          config.mutationConfig.onSuccess(result);
          
        }
      } catch (err) {
        console.error("Registration error:", err);
        helpers.setStatus({ success: false });
        
        if (err instanceof AxiosError && err.response) {
          const message = err.response?.data?.message || "Registration failed";
          helpers.setErrors({ submit: message });
        } else {
          helpers.setErrors({ submit: "An unexpected error occurred" });
        }
        
        if (config?.mutationConfig?.onError) {
          config.mutationConfig.onError(err);
        }
      } finally {
        helpers.setSubmitting(false);
      }
    },
  });

  return { formik, isRegistering };
};