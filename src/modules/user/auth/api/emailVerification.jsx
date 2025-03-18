import { api } from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

const verifyEmail = async ({id, hash}) => {
   const response = await api.post(`/api/email/verify/${id}/${hash}`);
   return response.data;
};

export const useVerifyEmail = ({ mutationConfig } = {}) => {
  const mutation = useMutation({
    mutationFn: verifyEmail,
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