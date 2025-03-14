import { useMutation } from "@tanstack/react-query";
import { cookAuthApi } from "./api-service";

/**
 * Hook for cook authentication operations
 * @param {Object} options - Configuration options
 * @param {Object} options.mutationConfig - Additional React Query mutation options
 * @returns {Object} Mutation object
 */
export const useCookAuth = ({ mutationConfig } = {}) => {
  const mutation = useMutation({
    mutationFn: cookAuthApi.login,
    ...mutationConfig,
  });

  return {
    login: mutation.mutateAsync,
    isLoading: mutation.isLoading,
    error: mutation.error,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
  };
};