import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";

// ============= AUTH HOOKS =============

// Cook Registration
export const registerCook = (data) => {
  return api.post("/api/cooks/register", data);
};

export const useRegisterCook = (options = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = options;
  
  return useMutation({
    mutationFn: registerCook,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: ["notices"],
      });
      onSuccess?.(...args);
    },
    ...restConfig
  });
};

// Upload Documents
export const uploadCookDocuments = (data) => {
  return api.post("/api/cooks/upload-documents", data);
};

export const useUploadCookDocuments = (options = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = options;
  
  return useMutation({
    mutationFn: uploadCookDocuments,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: ["cook-documents"],
      });
      onSuccess?.(...args);
    },
    ...restConfig
  });
};

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

// Cook Login
export const loginCook = (data) => {
  return api.post("/api/cooks/login", data);
};

export const useLoginCook = (options = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = options;
  
  return useMutation({
    mutationFn: loginCook,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: ["auth-status"],
      });
      onSuccess?.(...args);
    },
    ...restConfig
  });
};

// Reset Password
export const resetPasswordCook = (data) => {
  return api.post("/api/cooks/reset-password", data);
};

export const useResetPasswordCook = (options = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = options;
  
  return useMutation({
    mutationFn: resetPasswordCook,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: ["notices"],
      });
      onSuccess?.(...args);
    },
    ...restConfig
  });
};

// Forget Password (from your example)
export const forgetPasswordCook = (data) => {
  return api.post("/api/cooks/forgot-password", data);
};

export const useForgetPasswordCook = (options = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = options;
  
  return useMutation({
    mutationFn: forgetPasswordCook,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: ["notices"],
      });
      onSuccess?.(...args);
    },
    ...restConfig
  });
};

// Logout
export const logoutCook = () => {
  return api.post("/api/cooks/logout");
};

export const useLogoutCook = (options = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = options;
  
  return useMutation({
    mutationFn: logoutCook,
    onSuccess: (...args) => {
      queryClient.invalidateQueries();  // Invalidate all queries on logout
      onSuccess?.(...args);
    },
    ...restConfig
  });
};

// ============= MENU HOOKS =============

// Get Menu (public)
export const getMenu = () => {
  return api.get("/api/cooks/get-menu");
};

export const useGetMenu = (options = {}) => {
  return useQuery({
    queryKey: ["menu"],
    queryFn: getMenu,
    ...options
  });
};

// Store Menu
export const storeMenu = (data) => {
  return api.post("/api/cooks/store-menu", data);
};

export const useStoreMenu = (options = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = options;
  
  return useMutation({
    mutationFn: storeMenu,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: ["menu"],
      });
      onSuccess?.(...args);
    },
    ...restConfig
  });
};

// Update Menu
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

// Delete Menu
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

// ============= MENU ITEM HOOKS =============

// Get Menu Item
export const getMenuItem = (menuItemId) => {
  return api.get(`/api/cooks/get-menu-item/${menuItemId}`);
};

export const useGetMenuItem = (menuItemId, options = {}) => {
  return useQuery({
    queryKey: ["menu-item", menuItemId],
    queryFn: () => getMenuItem(menuItemId),
    ...options
  });
};

// Store Menu Item
export const storeMenuItem = ({ menuId, data }) => {
  return api.post(`/api/cooks/store-menu-item/${menuId}`, data);
};

export const useStoreMenuItem = (options = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = options;
  
  return useMutation({
    mutationFn: storeMenuItem,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: ["menu"],
      });
      onSuccess?.(...args);
    },
    ...restConfig
  });
};

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

// ============= PROFILE HOOKS =============

// Get Cook Profile
export const getCookProfile = () => {
  return api.get("/api/cooks/get-profile");
};

export const useGetCookProfile = (options = {}) => {
  return useQuery({
    queryKey: ["cook-profile"],
    queryFn: getCookProfile,
    ...options
  });
};

// Update Cook Profile
export const updateCookProfile = (data) => {
  return api.put("/api/cooks/update-profile", data);
};

export const useUpdateCookProfile = (options = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = options;
  
  return useMutation({
    mutationFn: updateCookProfile,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: ["cook-profile"],
      });
      onSuccess?.(...args);
    },
    ...restConfig
  });
};

// Change Password
export const changePasswordCook = (data) => {
  return api.post("/api/cooks/change-password", data);
};

export const useChangePasswordCook = (options = {}) => {
  const { onSuccess, ...restConfig } = options;
  
  return useMutation({
    mutationFn: changePasswordCook,
    onSuccess: (...args) => {
      onSuccess?.(...args);
    },
    ...restConfig
  });
};

// Upload Intro Video
export const uploadIntroVideo = (data) => {
  return api.put("/api/cooks/upload-intro-video", data);
};

export const useUploadIntroVideo = (options = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = options;
  
  return useMutation({
    mutationFn: uploadIntroVideo,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: ["cook-profile"],
      });
      onSuccess?.(...args);
    },
    ...restConfig
  });
};

// Delete Intro Video
export const deleteIntroVideo = () => {
  return api.delete("/api/cooks/delete-intro-video");
};

export const useDeleteIntroVideo = (options = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = options;
  
  return useMutation({
    mutationFn: deleteIntroVideo,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: ["cook-profile"],
      });
      onSuccess?.(...args);
    },
    ...restConfig
  });
};

// ============= LOCATION HOOKS =============

// Set Cook Location
export const setCookLocation = (data) => {
  return api.post("/api/cooks/set-location", data);
};

export const useSetCookLocation = (options = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = options;
  
  return useMutation({
    mutationFn: setCookLocation,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: ["cook-location"],
      });
      onSuccess?.(...args);
    },
    ...restConfig
  });
};

// Get Cook Location
export const getCookLocation = () => {
  return api.get("/api/cooks/get-location");
};

export const useGetCookLocation = (options = {}) => {
  return useQuery({
    queryKey: ["cook-location"],
    queryFn: getCookLocation,
    ...options
  });
};

// ============= ORDER HOOKS =============

// Get Cook Orders
export const getCookOrders = () => {
  return api.get("/api/cooks/orders/index");
};

export const useGetCookOrders = (options = {}) => {
  return useQuery({
    queryKey: ["cook-orders"],
    queryFn: getCookOrders,
    ...options
  });
};

// Update Order
export const updateOrder = ({ orderId, data }) => {
  return api.put(`/api/cooks/orders/${orderId}/update`, data);
};

export const useUpdateOrder = (options = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = options;
  
  return useMutation({
    mutationFn: updateOrder,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: ["cook-orders"],
      });
      onSuccess?.(...args);
    },
    ...restConfig
  });
};

// ============= EARNINGS HOOKS =============

// Get Cook Earnings
export const getCookEarnings = () => {
  return api.get("/api/cooks/earnings");
};

export const useGetCookEarnings = (options = {}) => {
  return useQuery({
    queryKey: ["cook-earnings"],
    queryFn: getCookEarnings,
    ...options
  });
};

// Withdraw Request
export const withdrawRequest = (data) => {
  return api.post("/api/cooks/withdraw-request", data);
};

export const useWithdrawRequest = (options = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = options;
  
  return useMutation({
    mutationFn: withdrawRequest,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: ["cook-earnings"],
      });
      onSuccess?.(...args);
    },
    ...restConfig
  });
};