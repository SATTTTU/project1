import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { toast } from "react-toastify";
import { UserChangePassword } from "../api/changePassword";
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

        toast.success(response?.message);
        resetForm();
      } catch (err) {
        console.log("error****", err);
        const errorMessage = err?.response?.data?.message;

        if (errorMessage === "Incorrect old password") {
          setErrors({ oldpassword: "The current password is incorrect." }); // Set Formik error for old password
        } else {
          setErrors({ submit: errorMessage });
        }

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

