import { api } from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

const checkout = async (userData) => {
   const response =await api.post("/api/checkout", userData);
   return response.data;
};

export const useCheckout = ({ mutationConfig } = {}) => {
  const mutation = useMutation({
    mutationFn: checkout,
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