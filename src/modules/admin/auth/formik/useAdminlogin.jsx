import { useFormik } from "formik";
import { signUpSchema } from "@/modules/user/auth/formik/schema/authschema";
import { useAdminRegister } from "../api/adminlogin";

export const useAdminRegisterFormik = (config = {}) => {
  const { mutateAsync, isLoading, isError, error, isSuccess } = useAdminRegister();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validate: (values) => {
      try {
        // Validate using Zod schema
        signUpSchema.parse(values);
        return {}; // No errors
      } catch (err) {
        // Convert Zod errors to Formik errors
        const errors = {};
        err.errors.forEach((issue) => {
          errors[issue.path[0]] = issue.message;
        });
        return errors;
      }
    },
    validateOnBlur: true,
    onSubmit: async (values) => {
      try {
        await mutateAsync(values);
        formik.resetForm();
      } catch (err) {
        console.error(err);
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
