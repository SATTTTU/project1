import { api } from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

// Logout API Call
const logoutUser = async () => {
  const response = await api.post("/api/logout"); 
  return response.data; 
};

export const useUserLogout = ({ mutationConfig } = {}) => {
  const mutation = useMutation({
    mutationFn: logoutUser,
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