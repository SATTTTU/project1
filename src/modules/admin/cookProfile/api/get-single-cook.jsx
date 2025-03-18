import { api } from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

export const getSingleCook = (cookId) => {
  return api.get(`/api/admins/get-all-cooks/${cookId}`);
};

export const useGetSingleCook = ({ mutationConfig } = {}) => {
  const mutation = useMutation({
    mutationFn: getSingleCook,
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