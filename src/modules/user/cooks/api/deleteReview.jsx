import { api } from "@/lib/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// ✅ Correct DELETE API function with error handling
export const deleteReview = async (reviewId) => {
  try {
    const response = await api.delete(`/api/delete-review/${reviewId}`);
    return response.data;
  } catch (error) {
    console.error("Delete Review API Error:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ React Query hook for deleting a review
export const useDeleteReview = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reviewId) => deleteReview(reviewId),
    onSuccess: (_, reviewId) => {
      // ✅ Invalidate only relevant queries after deletion
      queryClient.invalidateQueries({ queryKey: ["cookProfile"] });

      // ✅ Optionally call user-provided success handler
      if (options.onSuccess) options.onSuccess(reviewId);
    },
    onError: (error) => {
      console.error("Delete Review Mutation Error:", error);
    },
    ...options, // ✅ Pass additional options if needed
  });
};
