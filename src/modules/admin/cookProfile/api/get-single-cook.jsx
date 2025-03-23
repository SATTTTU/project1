import { api } from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

export const getSingleCook = (cookId) => {
  return api.get(`/api/admins/get-cook/${cookId}`);
};

export const useGetSingleCook = (cookId, { mutationConfig } = {}) => {
  const mutation = useMutation({
    mutationFn: async () => {
      try {
        console.log("Fetching cook with ID:", cookId); // Debugging
        const response = await getSingleCook(cookId);
        console.log("API Response:", response.data); // Debugging
        return response.data;
      } catch (error) {
        console.error("Error fetching cook:", error.response?.data || error);
        throw error;
      }
    },
    ...mutationConfig,
  });

  return {
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isLoading,
    error: mutation.error,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    data: mutation.data,
  };
};
