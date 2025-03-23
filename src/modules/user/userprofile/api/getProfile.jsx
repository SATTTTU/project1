
import { api } from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

// Admin Profile Edit API
const getUserProfile = async (userData) => {
  const response = await api.get("/api/get-profile", userData);
  console.log("profiledata",response.data)
  return response.data;
};

export const useProfile = ({ mutationConfig } = {}) => {
  const mutation = useMutation({
    mutationFn: getUserProfile,
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
