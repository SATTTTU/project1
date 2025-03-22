import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client"; // Ensure this is correctly set up

// Function to update a menu item
const updateMenu = async ({ menuId, data }) => {
  return api.post(`/api/cooks/update-menu-item/${menuId}?_method=put`, data);
};

// Hook for using update mutation
export const useUpdateMenu = (options = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = options;

  return useMutation({
    mutationFn: ({ menuId, data }) => updateMenu({ menuId, data }),
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: ["menu"], // Make sure this key matches your query keys
      });
      onSuccess?.(...args);
    },
    ...restConfig,
  });
};
