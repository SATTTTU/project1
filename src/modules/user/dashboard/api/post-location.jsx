import { api } from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

// API call to send location
export const setLocation = (data) => {
  return api.post(`/api/set-location`, data);
};

export const useSetLocation = ({ mutationConfig } = {}) => {
    const mutation = useMutation({
      mutationFn: setLocation,
      ...mutationConfig,
      onError: (error) => {
        if (error.response && error.response.status === 400) {
          console.error("Location already exists:", error.response.data);
        } else {
          console.error("Error saving location:", error);
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
