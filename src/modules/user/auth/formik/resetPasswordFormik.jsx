import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { resetPasswordSchema } from "../formik/schema/authschema";

export const useResetPasswordFormik = () => {
  return useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
    },
    validationSchema: toFormikValidationSchema(resetPasswordSchema),
  validateOnBlur: true,
    onSubmit: (values, { resetForm }) => {
      console.log("Resetting password...", values);
      resetForm();
    },
  });
};
