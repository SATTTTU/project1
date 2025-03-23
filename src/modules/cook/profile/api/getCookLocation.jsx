import { api } from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

// API call to send location
export const getCookLocation = (data) => {
  return api.get(`/api/cooks/get-location`, data);
};

export const UsegetCookLocation = ({ mutationConfig } = {}) => {
  const mutation = useMutation({
    mutationFn: getCookLocation,
    ...mutationConfig,
    onError: (error) => {
      if (error.response && error.response.status === 400) {
        console.error("Location didnt found:", error.response.data);
      } else {
        console.error("Error getting location:", error);
      }
    },
  });

  return {
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isLoading,
    error: mutation.error,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
  };
};
