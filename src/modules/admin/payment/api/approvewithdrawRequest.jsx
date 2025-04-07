import { api } from "@/lib/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

// API call to approve a transaction
export const approveMoney = (transactionId) => {
  return api.post(`/api/admins/withdraw-approve`, {
    transaction_id: transactionId,
  });
};

// React Query hook to manage mutation
export const useProvideMoney = ({ mutationConfig } = {}) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: approveMoney,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["withdrawRequests"]);
      toast.success(data?.message || "Payment approved successfully");
    },
    onError: (error) => {
      console.error("API Error Details:", error?.response?.data);
      toast.error(
        error?.response?.data?.message ||
        error?.message ||
        "Error approving payment"
      );
    },
    ...mutationConfig,
  });

  return {
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isLoading,
    error: mutation.error,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
  };
};
