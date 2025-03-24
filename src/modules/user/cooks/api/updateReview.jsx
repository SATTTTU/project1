import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client"; // Ensure this is correctly set up

const updateReview = async ({ reviewId, data }) => {
  return api.post(`/api/update-review/${reviewId}?_method=put`, data);
};

export const useUpdateReview = (options = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = options;

  return useMutation({
    mutationFn: ({ reviewId, data }) => updateReview({ reviewId, data }),
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: ["menu"], // Make sure this key matches your query keys
      });
      onSuccess?.(...args);
    },
    ...restConfig,
  });
};
