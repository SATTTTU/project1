import { api } from "@/lib/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const uploadIntroVideo = async (formData) => {
  try {
    // Ensure formData is properly formatted
    if (!(formData instanceof FormData)) {
      throw new Error("Invalid form data");
    }

    // Log the formData contents for debugging
    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    const response = await api.post("/api/cooks/upload-intro-video?_method=put", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Upload error details:", error);
    throw new Error(error.response?.data?.message || "Failed to upload video");
  }
};

export const deleteIntroVideo = async () => {
  try {
    const response = await api.delete("/api/cooks/delete-intro-video");
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete video");
  }
};

export const useUploadIntroVideo = (options = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, onError, ...restConfig } = options;

  return useMutation({
    mutationFn: uploadIntroVideo,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: ["cook-profile"],
      });
      onSuccess?.(...args);
    },
    onError: (error) => {
      console.error("Upload Video Error:", error);
      onError?.(error);
    },
    ...restConfig,
  });
};

export const useDeleteIntroVideo = (options = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, onError, ...restConfig } = options;

  return useMutation({
    mutationFn: deleteIntroVideo,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: ["CookProfile"],
      });
      onSuccess?.(...args);

    },
    onError: (error) => {
      console.error("Delete Video Error:", error);
      onError?.(error);
    },
    ...restConfig,
  });
};
