import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";

// API function for resetting password
export const forgetPasswordCook = (data) => {
  return api.post("/api/cooks/forgot-password", data);
};

// Hook for password reset mutation
export const useForgetPasswordCook = (options = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = options;
  
  return useMutation({
    mutationFn: forgetPasswordCook,
    onSuccess: (...args) => {
      // Invalidate relevant queries after successful reset request
      queryClient.invalidateQueries({
        queryKey: ["notices"],
      });
      // Call custom onSuccess handler if provided
      onSuccess?.(...args);
    },
    ...restConfig
  });
};