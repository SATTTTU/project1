import { api } from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

// Logout API Call
const logoutAdmin = async () => {
  const response = await api.post("/api/admins/logout"); 
  return response.data; 
};

export const useAdminLogout = ({ mutationConfig } = {}) => {
  const mutation = useMutation({
    mutationFn: logoutAdmin,
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
