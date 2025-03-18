import { api } from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

// Register API with better error handling
const registerAdmin = async (adminData) => {
  try {
    const response = await api.post("/api/admins/register", adminData);
    const { token, user } = response.data;

    // Store user and token in localStorage if registration is successful
    if (token) {
      localStorage.setItem("active_user", JSON.stringify(user)); // Store the user data
      localStorage.setItem(`token_${user.id}`, token); // Store the token with the user's ID
      console.log("✅ User and token stored successfully:", token, user);
    }

    return response.data;
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      console.log("Error response", status, data);

      if (status === 422) {
        throw {
          status,
          message: data.message || "Validation failed",
          errors: data.errors || {},  // This should contain field-specific errors
        };
      }
    }

    throw error;
  }
};

export const useAdminRegister = ({ mutationConfig } = {}) => {
  const mutation = useMutation({
    mutationFn: registerAdmin,
    ...mutationConfig,
  });

  return {
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isLoading,
    error: mutation.error,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    // Add a helper to get validation errors
    validationErrors: mutation.error?.errors || {},
  };
};
