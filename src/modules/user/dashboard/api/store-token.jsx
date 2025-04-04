import { api } from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

export const setNotification = (data) => {
  return api.post(`/api/store-token`, data);
};

export const useSetNotification = ({ mutationConfig } = {}) => {
    const mutation = useMutation({
      mutationFn: setNotification,
      ...mutationConfig,
      onError: (error) => {
        if (error.response && error.response.status === 400) {
          console.error("Notifiction:", error.response.data);
        } else {
          console.error("Error:", error);
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
