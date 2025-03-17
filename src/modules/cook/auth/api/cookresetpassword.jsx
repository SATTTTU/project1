import { api } from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

const resetPassword = async (userData) => {
  const response = await api.post("/api/password/reset", userData);
  return response.data;
};

export const useResetPassword = ({ mutationConfig } = {}) => {
  const mutation = useMutation({
    mutationFn: resetPassword,
    ...mutationConfig,
  });

  return {
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    error: mutation.error,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
  };
};