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
        const response = await mutateAsync(values); // Trigger registration API

        // Display success message from the server response
        toast.success(response?.message || "Successfully registered.");
        
        formik.resetForm(); // Reset form after successful submission
        setIsRegistrationSuccess(true); // Set success state

      } catch (err) {
        // Extract error message from the server response
        const errorMessage =
          err?.response?.data?.message ||
          (err?.response?.data?.errors
            ? Object.values(err.response.data.errors).flat().join(", ")
            : "An error occurred during registration.");

        // Set Formik errors and show toast error
        helpers.setErrors({ submit: errorMessage });
        toast.error(errorMessage);

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
