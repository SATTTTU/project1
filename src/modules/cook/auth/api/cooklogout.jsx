import { api } from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

// Logout API Call
const logoutCook = async () => {
  const response = await api.post("/api/logout"); 
  return response.data; 
};

export const useCookLogout = ({ mutationConfig } = {}) => {
  const mutation = useMutation({
    mutationFn: logoutCook,
    ...mutationConfig,
  });

  return {
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isLoading,
    error: mutation.error,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
  };
};