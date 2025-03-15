import { api } from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

// Register API
const loginAdmin = async (adminData) => {
  const response = await api.post("/api/admins/login", adminData);
  return response.data; // Return response data
};

export const useAdminLogin = ({ mutationConfig } = {}) => {
  const mutation = useMutation({
    mutationFn: loginAdmin,
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
