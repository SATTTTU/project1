import { api } from "@/lib/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// API function for resetting password
export const profileCook = (data) => {
  return api.post("/api/cooks/profile", data);
};

// Hook for password reset mutation
export const useprofileCook = (options = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = options;
  
  return useMutation({
    mutationFn: profileCook,
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