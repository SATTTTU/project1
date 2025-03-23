import { useQueryClient } from "@tanstack/react-query";

export const updateMenu = ({ menuId, data }) => {
    return api.put(`/api/cooks/update-menu/${menuId}`, data);
  };
  
  export const useUpdateMenu = (options = {}) => {
    const queryClient = useQueryClient();
    const { onSuccess, ...restConfig } = options;
    
    return useMutation({
      mutationFn: updateMenu,
      onSuccess: (...args) => {
        queryClient.invalidateQueries({
          queryKey: ["menu"],
        });
        onSuccess?.(...args);
      },
      ...restConfig
    });
  };