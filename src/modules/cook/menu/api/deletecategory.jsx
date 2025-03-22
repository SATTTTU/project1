import { useQueryClient } from "@tanstack/react-query";

export const deleteMenu = (menuId) => {
    return api.delete(`/api/cooks/delete-menu/${menuId}`);
  };
  
  export const useDeleteMenu = (options = {}) => {
    const queryClient = useQueryClient();
    const { onSuccess, ...restConfig } = options;
    
    return useMutation({
      mutationFn: deleteMenu,
      onSuccess: (...args) => {
        queryClient.invalidateQueries({
          queryKey: ["menu"],
        });
        onSuccess?.(...args);
      },
      ...restConfig
    });
  };