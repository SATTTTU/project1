import { api } from "@/lib/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const deleteMenuItem = (menuItemId) => {
    return api.delete(`/api/cooks/delete-menu-item/${menuItemId}`);
  };
  
  export const useDeleteMenuItem = (options = {}) => {
    const queryClient = useQueryClient();
    const { onSuccess, ...restConfig } = options;
    
    return useMutation({
      mutationFn: deleteMenuItem,
      onSuccess: (...args) => {
        queryClient.invalidateQueries({
          queryKey: ["menu"],
        });
        queryClient.invalidateQueries({
          queryKey: ["menu-item"],
        });
        onSuccess?.(...args);
      },
      ...restConfig
    });
  };