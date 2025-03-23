import { api } from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

const editUserProfile = async (userData) => {

  if (userData instanceof FormData) {
    console.log("FormData contents:");
    for (let [key, value] of userData.entries()) {
      console.log(`${key}: ${value instanceof File ? `File: ${value.name}` : value}`);
    }
  }
  const response = await api.post("/api/update-profile?_method=put", userData);
  return response.data;
};

export const UpdateProfile = ({ mutationConfig } = {}) => {
  const mutation = useMutation({
    mutationFn: editUserProfile,
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
