import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useRiderLogin } from "../api/riderLogin"; // Use the correct API function
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/context/useAuth";
import { riderSignInSchema } from "./schema";

export const useRiderLoginFormik = () => {
  const { mutateAsync, isLoading, isError, error, isSuccess } = useRiderLogin(); // Correct API call
  const navigate = useNavigate();
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: toFormikValidationSchema(riderSignInSchema),
    onSubmit: async (values, helpers) => {
      try {
        const response = await mutateAsync(values);
        console.log("Rider Login Response:", response);

        if (!response.token) {
          throw new Error("No token received from server");
        }

        await login({ type: "rider" }, response.token);

        toast.success("Login successful");
        formik.resetForm();
        navigate("/rider/main"); // Redirect to the Rider Dashboard
      } catch (err) {
        console.error("Rider Login Error:", err);
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
