import { api } from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

export const getSingleCook = (cookId) => {
  return api.get(`/api/admins/get-cook/${cookId}`);
};

export const useGetSingleCook = (cookId, { mutationConfig } = {}) => {
  const mutation = useMutation({
    mutationFn: () => getSingleCook(cookId),
    ...mutationConfig,
  });
  
  return {
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isLoading,
    error: mutation.error,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    data: mutation.data,
  };
};