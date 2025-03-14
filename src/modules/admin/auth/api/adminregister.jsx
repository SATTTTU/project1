import { api } from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

// Register API
const registerAdmin = async (adminData) => {
  const response = await api.post("/api/register", adminData);
  return response.data; // Return response data
};

export const useAdminRegister = ({ mutationConfig } = {}) => {
  const mutation = useMutation({
    mutationFn: registerAdmin,
    ...mutationConfig,
  });

  return {
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isLoading, // Fixed the loading state
    error: mutation.error,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
  };
};
