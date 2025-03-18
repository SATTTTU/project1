import { useFormik } from "formik";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { resetPasswordSchema } from "./schema/authschema";
import { useResetPassword } from "../api/resetPassword";

export const useResetPasswordFormik = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { mutateAsync, isLoading, isSuccess } = useResetPassword();

  // Extract token from the URL
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");

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
      if (!token) {
        helpers.setErrors({ email: "Invalid or expired reset link." });
        return;
      }

      try {
        await mutateAsync(values, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        helpers.setStatus({ success: true, message: "Password reset successful!" });
      } catch (err) {
        console.error("Error:", err);
        helpers.setStatus({ success: false });

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
