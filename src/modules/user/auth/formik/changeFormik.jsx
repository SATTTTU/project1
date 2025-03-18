import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { toast } from "react-toastify";
import {UserChangePassword } from "../api/changePassword";
import { changePasswordSchema } from "./schema/authschema";

export const UsechangePasswordFormik = () => {
  const { mutateAsync, isLoading, isError, error, isSuccess } = UserChangePassword();

  const formik = useFormik({
    initialValues: {
      oldpassword: "", 
      newpassword: "",
      confirmpassword: "",
    },
    validationSchema: toFormikValidationSchema(changePasswordSchema),
    onSubmit: async (values, { resetForm, setErrors }) => {
      try {
        const response = await mutateAsync({
          oldpassword: values.oldpassword,
          newpassword: values.newpassword,
          confirmpassword: values.confirmpassword,
        });

        toast.success(response?.message || "Password reset successfully.");
        resetForm();
      } catch (err) {
        const errorMessage =
          err?.response?.data?.message ||
          (err?.response?.data?.errors
            ? Object.values(err.response.data.errors).flat().join(", ")
            : "An error occurred while resetting the password.");

        setErrors({ submit: errorMessage });
        console.error("Password reset error:", err);
        toast.error(errorMessage);
      }
    },
  });

  return {
    formik,
    isLoading,
    isError,
    error,
    isSuccess,
  };
};
