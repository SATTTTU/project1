import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { signUpSchema } from "@/modules/user/auth/formik/schema/authschema";
import { useAdminRegister } from "../api/adminregister";
import { toast } from "react-toastify";
import { useState } from "react";  // Import useState to manage the success state

export const useAdminRegisterFormik = () => {
  const { mutateAsync, isLoading, isError, error, isSuccess } = useAdminRegister();
  
  // Track registration success
  const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false);

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
        toast.success("Successfully registered");

        // Set success state to true to show the success component
        setIsRegistrationSuccess(true);

      } catch (err) {
        const errorMessage = err?.response?.data?.message || "An error occurred during registration.";
        helpers.setErrors({
          submit: errorMessage,
        });

        // Display error toast with the error message
        toast.error(errorMessage);

        // Optionally log the error for debugging
        console.error("Registration Error:", err);
      }
    },
  });

  return {
    formik,
    isLoading,
    isError,
    error,
    isSuccess,
    isRegistrationSuccess,  // Return the success state
  };
};
