import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client"; 

const updateReview = async ({ reviewId, data }) => {
  const response = await api.put(`/api/update-review/${reviewId}`, data); 
  console.log("edit", response.data); // Optional: for debugging
  return response.data;
};

export const useUpdateReview = (options = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, onError, ...restConfig } = options;

  return useMutation({
    mutationFn: updateReview, 
    onSuccess: (updatedReview) => {
      queryClient.invalidateQueries({
        queryKey: ["reviews"], // Update to "reviews" if that's the correct query key
      });

      onSuccess?.(updatedReview);
    },
    onError: (error) => {
      console.error("Error updating review:", error);
      // Optional: show a user-friendly error message
      onError?.(error);
    },
    ...restConfig,
  });
};
