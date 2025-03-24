import { api } from "@/lib/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// API Call to Store Items in Cart
export const storeCartItem = async ({ menu_item_id, quantity }) => {
  try {
    const response = await api.post("/api/baskets/store", { menu_item_id, quantity });
    console.log("Added to cart:", response.data.items);
    return response.data.items; // Return full updated cart
  } catch (error) {
    console.error("Error adding to cart:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to add item to cart.");
  }
};

// React Query Hook for Storing Items
export const useStoreItem = (mutationConfig = {}) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(storeCartItem, {
    ...mutationConfig,
    onMutate: async (newItem) => {
      // Optimistic Update: Cancel Ongoing Cart Fetches
      await queryClient.cancelQueries("cart");

      // Get Current Cart Data
      const previousCart = queryClient.getQueryData("cart") || [];

      // Optimistically Add New Item with Temporary ID
      queryClient.setQueryData("cart", (oldCart) => [
        ...(oldCart || []),
        { ...newItem, id: `temp-${Date.now()}` }, // Temporary ID for UI update
      ]);

      return { previousCart };
    },

    onSuccess: (updatedCart) => {
      // ✅ Immediately Update UI with Latest Cart from API
      queryClient.setQueryData("cart", updatedCart);
    },

    onError: (error, newItem, context) => {
      console.error("Add to cart failed:", error);
      // ❌ Rollback to Previous Cart State on Error
      queryClient.setQueryData("cart", context.previousCart);
    },

    onSettled: () => {
      // 🔄 Ensure Cart is Always Updated from Server
      queryClient.invalidateQueries("cart");
    },
  });

  return {
    addItem: mutation.mutateAsync, // Function to add item to cart
    isLoading: mutation.isPending,
    error: mutation.error,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
  };
};
