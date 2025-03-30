import { api } from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

// API call for creating a review
const createReview = async (reviewData) => {
  const response = await api.post("/api/store-review", {
    cook_id: reviewData.cook_id, // Correct field name
    ratings: reviewData.ratings, // Correct field name
    comment: reviewData.comment,
  });
  console.log("Review Created:", response.data);
  return response.data;
};

// Custom hook for review mutation
export const useReview = ({ mutationConfig } = {}) => {
  const mutation = useMutation({
    mutationFn: createReview, // Function to create a review
    ...mutationConfig,
  });

  return {
    mutateAsync: mutation.mutateAsync, // Async mutation trigger
    isLoading: mutation.isLoading, // Loading state for the mutation
    error: mutation.error, // Error response if mutation fails
    isError: mutation.isError, // Boolean indicating if the mutation failed
    isSuccess: mutation.isSuccess, // Boolean indicating if the mutation succeeded
  };
};
