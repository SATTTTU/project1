import { api } from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

export const DeleteCook = (cookId) => {
  return api.delete(`/api/admins/delete-cook/${cookId}`);
};

export const useDeleteCook = (cookId, { mutationConfig } = {}) => {
  const mutation = useMutation({
    mutationFn: () => DeleteCook(cookId),
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