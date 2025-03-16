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
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: toFormikValidationSchema(resetPasswordSchema),
    onSubmit: async (values, helpers) => {
      try {
        await mutateAsync(values);
        helpers.setStatus({ success: true, message: "Password reset successful!" });

      } catch (err) {
        console.error("Error:", err);
        helpers.setStatus({ success: false });
        helpers.setErrors({ confirmPassword: err?.message || "Password reset failed" });


      } finally {
        helpers.setSubmitting(false);
      }
    },
  });

  return { formik, isLoading, isSuccess };
};

