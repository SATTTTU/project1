import { api } from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

// Admin Profile Edit API
const editAdminProfile = async (adminData) => {
  // Log form data contents for debugging (optional)
  if (adminData instanceof FormData) {
    console.log("FormData contents:");
    for (let [key, value] of adminData.entries()) {
      console.log(`${key}: ${value instanceof File ? `File: ${value.name}` : value}`);
    }
  }
  
  // Send the request with FormData
  const response = await api.post("/api/admins/update-profile?_method=put", adminData);
  return response.data;
};

export const useAdminProfileEdit = ({ mutationConfig } = {}) => {
  const mutation = useMutation({
    mutationFn: editAdminProfile,
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