import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { signInSchema } from "../schema/adminformSchema";
import { useAdminLogin } from "../api/adminlogin";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/context/useAuth";

export const useAdminLoginFormik = () => {
  const { mutateAsync, isLoading, isError, error, isSuccess } = useAdminLogin();
  const navigate = useNavigate();
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: toFormikValidationSchema(signInSchema), 
    onSubmit: async (values, helpers) => {
      try {
        const response = await mutateAsync(values);
        console.log("Login Response:", response); // Debugging

        if (!response.token) {
          throw new Error("No token received from server");
        }

        await login({ type: "admin" }, response.token);

        toast.success("Login successfully");
        formik.resetForm();
        navigate("/admin/dashboard")
      } catch (err) {
        console.error("Login Error:", err); // Debugging
        const errorMessage =
          err?.response?.data?.message || "An error occurred";
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
