
// ============= MENU HOOKS =============

import { api } from "@/lib/api-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// // Get Menu (public)
// export const getMenu = () => {
//     return api.get("/api/cooks/get-menu");
//   };
  
//   export const useGetMenu = (options = {}) => {
//     return useQuery({
//       queryKey: ["menu"],
//       queryFn: getMenu,
//       ...options
//     });
//   };
  
  // // Store Menu
  // export const storeMenu = (data) => {
  //   return api.post("/api/cooks/store-menu", data);
  // };
  
  // export const useStoreMenu = (options = {}) => {
  //   const queryClient = useQueryClient();
  //   const { onSuccess, ...restConfig } = options;
    
  //   return useMutation({
  //     mutationFn: storeMenu,
  //     onSuccess: (...args) => {
  //       queryClient.invalidateQueries({
  //         queryKey: ["menu"],
  //       });
  //       onSuccess?.(...args);
  //     },
  //     ...restConfig
  //   });
  // };
  
  // Update Menu
  // export const updateMenu = ({ menuId, data }) => {
  //   return api.put(`/api/cooks/update-menu/${menuId}`, data);
  // };
  
  // export const useUpdateMenu = (options = {}) => {
  //   const queryClient = useQueryClient();
  //   const { onSuccess, ...restConfig } = options;
    
  //   return useMutation({
  //     mutationFn: updateMenu,
  //     onSuccess: (...args) => {
  //       queryClient.invalidateQueries({
  //         queryKey: ["menu"],
  //       });
  //       onSuccess?.(...args);
  //     },
  //     ...restConfig
  //   });
  // };
  
  // Delete Menu
  
  
  // ============= MENU ITEM HOOKS =============
  
  // Get Menu Item
  // export const getMenuItem = (menuItemId) => {
  //   return api.get(`/api/cooks/get-menu-item/${menuItemId}`);
  // };
  
  // export const useGetMenuItem = (menuItemId, options = {}) => {
  //   return useQuery({
  //     queryKey: ["menu-item", menuItemId],
  //     queryFn: () => getMenuItem(menuItemId),
  //     ...options
  //   });
  // };
  
  // Store Menu Item
  // export const storeMenuItem = ({ menuId, data }) => {
  //   return api.post(`/api/cooks/store-menu-item/${menuId}`, data);
  // };
  
  // export const useStoreMenuItem = (options = {}) => {
  //   const queryClient = useQueryClient();
  //   const { onSuccess, ...restConfig } = options;
    
  //   return useMutation({
  //     mutationFn: storeMenuItem,
  //     onSuccess: (...args) => {
  //       queryClient.invalidateQueries({
  //         queryKey: ["menu"],
  //       });
  //       onSuccess?.(...args);
  //     },
  //     ...restConfig
  //   });
  // };
  
  // Update Menu Item
  export const updateMenuItem = ({ menuItemId, data }) => {
    return api.put(`/api/cooks/update-menu-item/${menuItemId}`, data);
  };
  
  export const useUpdateMenuItem = (options = {}) => {
    const queryClient = useQueryClient();
    const { onSuccess, ...restConfig } = options;
    
    return useMutation({
      mutationFn: updateMenuItem,
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
  
  // Delete Menu Item
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
  