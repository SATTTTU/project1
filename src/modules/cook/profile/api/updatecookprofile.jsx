import { api } from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

const updateCookProfile = async (cookData) => {
  const response = await api.post("/api/update-profile?_method=put", cookData);
  return response.data;
};

export const UpdateProfile = ({ mutationConfig } = {}) => {
  const mutation = useMutation({
    mutationFn: updateCookProfile,
    ...mutationConfig,
  });

  return {
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isLoading, // Loading state
    error: mutation.error,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
  };
};
