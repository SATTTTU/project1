import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { signInSchema } from "../schema/adminformSchema";
import { useAdminLogin } from "../api/adminlogin";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const useAdminLoginFormik = () => {
  const { mutateAsync, isLoading, isError, error, isSuccess } = useAdminLogin();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: toFormikValidationSchema(signInSchema), // Use zod-formik-adapter for validation
    onSubmit: async (values, helpers) => {
      try {
        await mutateAsync(values);
        toast.success("Login successfully");
        formik.resetForm();
        navigate('/admin/dashboard');
      } catch (err) {
        const errorMessage = err?.response?.data?.message || "An error occurred";
        helpers.setErrors({ submit: errorMessage });
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
