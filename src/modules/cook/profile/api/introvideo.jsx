import { api } from "@/lib/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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