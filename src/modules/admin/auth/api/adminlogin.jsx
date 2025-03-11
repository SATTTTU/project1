import { api } from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

// Fixing async and await
const loginAdmin = async (admindata) => {
  const response = await api.post("/api/login", admindata);
  return response.data; // Return response data
};

export const useAdminRegister = ({ mutationConfig } = {}) => {
  const mutation = useMutation({
    mutationFn: loginAdmin,
    ...mutationConfig,
  });

  return {
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isLoading, // Fixed the state
    error: mutation.error,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
  };
};
