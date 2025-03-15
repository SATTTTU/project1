import { api } from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

// Register API with better error handling
const registerAdmin = async (adminData) => {
  try {
    const response = await api.post("/api/admins/register", adminData);
    return response.data;
  } catch (error) {
    // Extract validation messages from the response
    if (error.response) {
      // If the server returned a response with an error status
      const { status, data } = error.response;
      console.log("Error response", status, data);
      
      if (status === 422) {
        // For validation errors, throw the error messages
        throw {
          status,
          message: data.message || "Validation failed",
          errors: data.errors || {},  // This should contain field-specific errors
        };
      }
    }
    
    // For other errors, just rethrow
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