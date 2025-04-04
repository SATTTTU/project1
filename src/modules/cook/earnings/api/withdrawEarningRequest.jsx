import { api } from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

const WithdrawEarningsRequest = async (cookdata) => {
  const response = await api.post("/api/cooks/withdraw-request", cookdata);
  return response.data; // Return response data
};

export const useWithdrawEarningsRequest = ({ mutationConfig } = {}) => {
  const mutation = useMutation({
    mutationFn: WithdrawEarningsRequest,
    ...mutationConfig,
  });

  return {
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isLoading, // Fixed the state
    error: mutation.error,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
  };
};
