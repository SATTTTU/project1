import { api } from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

const forgotPassword = async (userData) => {
   const response = await api.post("/api/password/forgot", userData);
   return response.data;
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