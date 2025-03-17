import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { resetPasswordSchema } from "../formik/schema/authschema";
import { useEffect } from "react";
import { useResetPassword } from "../api/resetPassword"; 
import { useNavigate } from "react-router-dom";

export const useResetPasswordFormik = () => {
  const navigate = useNavigate();
  const { mutateAsync, isLoading, isSuccess } = useResetPassword();

  useEffect(() => {
    if (isSuccess) {
      navigate("/user/login");
    }
  }, [isSuccess, navigate]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      password_confirmation: "",
    },
    validationSchema: toFormikValidationSchema(resetPasswordSchema),
    onSubmit: async (values, helpers) => {
      try {
        // ✅ Get token from local storage
        const token = localStorage.getItem("resetToken");

        if (!token) {
          helpers.setErrors({ email: "Authentication error. Please log in again." });
          return;
        }

        // ✅ Send API request with token
        await mutateAsync(
          values,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        helpers.setStatus({ success: true, message: "Password reset successful!" });
      } catch (err) {
        console.error("Error:", err);
        helpers.setStatus({ success: false });

        // ✅ Ensure correct error handling
        helpers.setErrors({
          email: err?.response?.data?.email || "",
          password: err?.response?.data?.password || "Password reset failed",
        });
      } finally {
        helpers.setSubmitting(false);
      }
    },
  });

  return { formik, isLoading, isSuccess };
};
