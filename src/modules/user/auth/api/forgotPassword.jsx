import { api } from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

const forgotPassword = async (userData) => {
   const response = api.post("/api/password/forget", userData);
   return response.data;
  // No need to extract .data since your interceptor already returns response.data
};

export const useForgotPassword = ({ mutationConfig } = {}) => {
  const mutation = useMutation({
    mutationFn: forgotPassword,
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