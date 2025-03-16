import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { signUpSchema } from "@/modules/user/auth/formik/schema/authschema";
import { useAdminRegister } from "../api/adminregister";
import { toast } from "react-toastify";

export const useAdminRegisterFormik = () => {
  const { mutateAsync, isLoading, isError, error, isSuccess } = useAdminRegister();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: toFormikValidationSchema(signUpSchema), // Use Zod schema adapter for Formik validation
    onSubmit: async (values, helpers) => {
      try {
        await mutateAsync(values);
        formik.resetForm(); // Reset form after successful submission
        toast.success("Sucessfully registered");
      } catch (err) {
        // Handle errors by setting form errors
        helpers.setErrors({
          submit: err?.response?.data?.message || "An error occurred during registration.",
        });
        toast.error("something went wrong",error)
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
