import { useFormik } from "formik";
import { useCookLogin } from "../api/cooklogin";
import { loginSchema } from "./schema/validationschema";

export const useCookLoginFormik = () => {
  const { mutateAsync, isLoading, isError, error, isSuccess } = useCookLogin();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (values) => {
      try {
        // Validate using Zod schema
        loginSchema.parse(values);
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
