import { api } from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

const editUserProfile = async (userData) => {
  const response = await api.post("/api/update-profile?_method=put", userData);
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
