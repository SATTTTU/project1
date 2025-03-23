import { api } from "@/lib/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Email Verification
export const verifyEmail = ({ id, hash }) => {
    return api.get(`/api/cooks/email/verify/${id}/${hash}`);
  };
  
  export const useVerifyEmail = (options = {}) => {
    const queryClient = useQueryClient();
    const { onSuccess, ...restConfig } = options;
    
    return useMutation({
      mutationFn: verifyEmail,
      onSuccess: (...args) => {
        queryClient.invalidateQueries({
          queryKey: ["auth-status"],
        });
        onSuccess?.(...args);
      },
      ...restConfig
    });
  };
  