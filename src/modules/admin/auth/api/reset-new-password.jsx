import { api } from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

// Forgot Password API Call
export const ResetPassword = (data) => {
  return api.post(`/api/admins/reset-password`, data);
};

export const useAdminNewResetPassword = ({ mutationConfig } = {}) => {
  const mutation = useMutation({
    mutationFn: ResetPassword,
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
