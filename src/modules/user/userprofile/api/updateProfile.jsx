import { api } from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

// Admin Profile Edit API
const editUserProfile = async (userData) => {
  const response = await api.put("/api/update-profile", userData);
  return response.data;
};

export const UpdateProfile = ({ mutationConfig } = {}) => {
  const mutation = useMutation({
    mutationFn: editUserProfile,
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
