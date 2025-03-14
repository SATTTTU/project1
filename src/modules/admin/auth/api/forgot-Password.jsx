import { api } from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

// Forgot Password API Call
export const ForgotPassword = (data) => {
  return api.post(`/admin/forgot-password`, data);
};

export const useAdminForgotPassword = ({ mutationConfig } = {}) => {
  const mutation = useMutation({
    mutationFn: ForgotPassword,
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
