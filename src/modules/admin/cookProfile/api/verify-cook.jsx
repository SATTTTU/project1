import { api } from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

export const VerifyCook = (cookId, params) => {
  console.log(`Making verify request to /api/admins/verify-cook/${cookId} with params:`, params);
  return api.put(`/api/admins/verify-cook/${cookId}`, params);
};

export const useVerifyCook = (cookId, { mutationConfig } = {}) => {
  const mutation = useMutation({
    mutationFn: (params) => VerifyCook(cookId, params),
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