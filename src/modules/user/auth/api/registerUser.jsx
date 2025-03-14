import { api } from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

const registerUser = async (userData) => {
   const response = api.post("/api/register", userData);
   return response.data;
  // No need to extract .data since your interceptor already returns response.data
};

export const useUserRegister = ({ mutationConfig } = {}) => {
  const mutation = useMutation({
    mutationFn: registerUser,
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