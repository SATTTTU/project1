import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";

const updateMenu = async ({ menuId, data }) => {
  const response= api.post(`/api/cooks/update-menu-item/${menuId}?_method=put`, data);
return response.data;
};

export const useUpdateMenu = (options = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, onError, ...restConfig } = options;

  return useMutation({
    mutationFn: ({ menuId, data }) => updateMenu({ menuId, data }),
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ["menuItem"] });
      onSuccess?.(...args);
    },
    onError,
    ...restConfig,
  });
};
