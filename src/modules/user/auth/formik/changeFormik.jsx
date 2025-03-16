import { useFormik } from "formik";
import { changePasswordSchema } from "../../../../modules/user/auth/formik/schema/authschema";
import { toFormikValidationSchema } from "zod-formik-adapter";

export const useChangePasswordFormik = () => {
  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: toFormikValidationSchema(changePasswordSchema),
    validateOnBlur: true,
    onSubmit: (values, { resetForm }) => {
      console.log("Changing password...", values);
      alert("Password changed successfully!");
      resetForm();
    },
  });

  return { formik };
};
