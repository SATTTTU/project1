import { api } from "@/lib/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// ✅ API function to delete a review
export const deleteReview = async (reviewId) => {
  try {
    await api.delete(`/api/delete-review/${reviewId}`);
    return reviewId; // Return review ID for easier UI updates
  } catch (error) {
    console.error("Delete Review API Error:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Custom hook to delete a review with optimistic updates
export const useDeleteReview = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteReview,

    onMutate: async (reviewId) => {
      await queryClient.cancelQueries(["cookProfile"]); // Stop ongoing queries

      // ✅ Get current cache data
      const previousData = queryClient.getQueryData(["cookProfile"]);

      // ✅ Optimistically update the cache before the API request
      queryClient.setQueryData(["cookProfile"], (oldData) => ({
        ...oldData,
        reviews: oldData?.reviews?.filter((r) => r.review_id !== reviewId),
        reviewCount: oldData?.reviewCount ? oldData.reviewCount - 1 : 0,
      }));

      return { previousData };
    },

    onError: (error, _, context) => {
      console.error("Delete Review Mutation Error:", error);
      // 🔄 Revert cache if the deletion fails
      if (context?.previousData) {
        queryClient.setQueryData(["cookProfile"], context.previousData);
      }
    },

    onSuccess: (_, reviewId) => {
      queryClient.invalidateQueries(["cookProfile"]); // Refresh data after deletion

      // ✅ Call user-provided success handler if available
      if (options.onSuccess) options.onSuccess(reviewId);
    },

    onSettled: () => {
      queryClient.invalidateQueries(["cookProfile"]); // Ensure data is refetched
    },

    ...options, // ✅ Support additional mutation options
  });
};
