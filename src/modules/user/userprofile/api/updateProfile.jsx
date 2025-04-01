import { api } from "@/lib/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const editUserProfile = async (userData) => {
  const response = await api.post("/api/update-profile?_method=put", userData);
  return response.data;
};

export const UpdateProfile = ({ mutationConfig } = {}) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: editUserProfile,
    onSuccess: () => {
      queryClient.invalidateQueries(["userProfile"]); 
    },
    ...mutationConfig,
  });

  return {
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isLoading,
    error: mutation.error,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
  };
};
