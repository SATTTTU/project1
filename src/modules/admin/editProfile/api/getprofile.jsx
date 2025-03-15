import { api } from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

// Admin Profile Edit API
const getAdminProfile = async (adminData) => {
  const response = await api.get("/api/admins/get-profile", adminData);
  return response.data;
};

export const useAdminProfile = ({ mutationConfig } = {}) => {
  const mutation = useMutation({
    mutationFn: getAdminProfile,
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
