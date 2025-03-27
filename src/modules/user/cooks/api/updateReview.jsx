import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client"; 

const updateReview = async ({ reviewId, data }) => {
  const response = await api.put(`/api/update-review/${reviewId}`, data); 
  console.log("edit", response.data) 
  return response.data;
};

export const useUpdateReview = (options = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = options;

  return useMutation({
    mutationFn: updateReview, 
    onSuccess: (updatedReview) => {
      queryClient.invalidateQueries({
        queryKey: ["menu"], 
      });

      onSuccess?.(updatedReview);
    },
    ...restConfig,
  });
};
