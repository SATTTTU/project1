import { api } from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

// ✅ Fix: Ensure correct API request format
const getCartItems = async (userData) => {
  console.log("🔄 Fetching Cart Items for:", userData);

  const response = await api.get("/api/baskets/index", { params: userData });

  console.log("✅ API Response:", response.data);
  return response.data;
};

export const useUserBasket = ({ mutationConfig } = {}) => {
  const mutation = useMutation({
    mutationFn: async (userData) => {
      console.log("🔄 API Request Triggered:", userData);
      return getCartItems(userData);
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
