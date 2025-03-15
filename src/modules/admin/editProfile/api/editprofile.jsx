import { api } from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

// Admin Profile Edit API
const editAdminProfile = async (adminData) => {
  const response = await api.put("/api/admins/update-profile", adminData);
  return response.data;
};

export const useAdminProfileEdit = ({ mutationConfig } = {}) => {
  const mutation = useMutation({
    mutationFn: editAdminProfile,
    ...mutationConfig,
  });

  return {
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isLoading, // Loading state
    error: mutation.error,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
  };
};
