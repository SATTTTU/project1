import { api } from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

// Forgot Password API Call
export const CreateCategory = (data) => {
  return api.post(`/api/cooks/store-menu`, data);
};

export const UseCreateCategory = ({ mutationConfig } = {}) => {
  const mutation = useMutation({
    mutationFn: CreateCategory,
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
