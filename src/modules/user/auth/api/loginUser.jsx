import { api } from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

const loginUser = async (userData) => {
   const response =await api.post("/api/login", userData);
   return response.data;
};

export const useUserLogin = ({ mutationConfig } = {}) => {
  const mutation = useMutation({
    mutationFn: loginUser,
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