import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { AxiosError } from "axios";
import { signUpSchema } from "./schema/authschema";
import { toast } from "react-toastify";  
import "react-toastify/dist/ReactToastify.css"; 
import { useReview } from "../api/storeReviews";

export const useStoreReviewFormik = (config = {}) => {
  const { mutateAsync, isLoading: isRegistering } = useReview({
    mutationConfig: config?.mutationConfig,
  });

  const formik = useFormik({
    initialValues: {
      comment: "",
      rating: "",
    },
    validationSchema: toFormikValidationSchema(signUpSchema),
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: async (values, helpers) => {
      try {
        const result = await mutateAsync(values);
        helpers.setStatus({ success: true, message: "Registration successful" });
        helpers.resetForm();

        toast.success("🎉 Registration successful!", {
          position: "top-right",
          autoClose: 3000,
        });

        console.log("Registration successful:", result);

        if (config?.mutationConfig?.onSuccess) {
          config.mutationConfig.onSuccess(result);
        }
      } catch (err) {
        console.error("Registration error:", err);
        // helpers.setStatus({ success: false });

        if (err instanceof AxiosError && err.response) {
          const status = err.response?.status;
          const message =
            err.response?.data?.message || "Registration failed";

          if (status === 422) {
            // helpers.setErrors({ email: "This email is already registered. Please use a different email." });

            toast.error(" This email is already registered. Try another one!", {
              position: "top-right",
              autoClose: 3000,
            });
          } else {
            helpers.setErrors({ submit: message });

            toast.error(`⚠️ ${message}`, {
              position: "top-right",
              autoClose: 3000,
            });
          }
        } else {
          helpers.setErrors({ submit: "An unexpected error occurred" });

          toast.error("❌ An unexpected error occurred. Please try again later.", {
            position: "top-right",
            autoClose: 3000,
          });
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
