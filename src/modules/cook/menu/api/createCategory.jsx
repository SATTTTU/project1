import { api } from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

// Create Category API Call
export const createCategory = async (data) => {
  try {
    // No need to manually get the token or set Authorization headers
    // The request interceptor in api-client.js will handle this automatically
    console.log("🔍 Sending request to API with data:", data);
    
    const response = await api.post(`/api/cooks/store-menu`, data);
    
    console.log("✅ API Response:", response);
    return response;
  } catch (error) {
    console.error("❌ API Error:", error.response?.data || error.message);
    throw error;
  }
};

// Custom Hook for Creating Category
export const useCreateCategory = ({ mutationConfig } = {}) => {
  const mutation = useMutation({
    mutationFn: createCategory,
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