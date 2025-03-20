import { api } from "@/lib/api-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
