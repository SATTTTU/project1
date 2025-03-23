import { api } from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

const createReview = async (reviewData) => {
    const response = await api.post("/api/store-review", {
      cook_id: reviewData.cook_id, // Correct field name
      ratings: reviewData.ratings, // Correct field name
      comment: reviewData.comment,
    });
    return response.data;
  };

export const useReview = ({ mutationConfig } = {}) => {
  const mutation = useMutation({
    mutationFn: createReview,
    ...mutationConfig,
  });

  return {
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    error: mutation.error,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
  };
};