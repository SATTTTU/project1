import { api } from "@/lib/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const updateCartItem = async ({ item_id, quantity }) => {
  try {
    const response = await api.put(`/api/baskets/update/item/${item_id}`, { quantity });
    console.log("Updated Cart Item:", response.data.items);
    return response.data.items;
  } catch (error) {
    console.error("Error updating cart item:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to update cart item.");
  }
};

export const useUpdateStoreItem = (mutationConfig = {}) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateCartItem,
    onMutate: async ({ item_id, quantity }) => {
      await queryClient.cancelQueries(["cartItems"]); // Cancel any outgoing refetches
      const previousCart = queryClient.getQueryData(["cartItems"]); // Get previous cart state

      queryClient.setQueryData(["cartItems"], (oldCart) => {
        return oldCart?.map((item) =>
          item.item_id === item_id ? { ...item, quantity } : item
        );
      });

      return { previousCart };
    },
    onError: (error, _, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(["cartItems"], context.previousCart); // Revert on error
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(["cartItems"]); // Refetch cart data after mutation
    },
    ...mutationConfig,
  });

  return {
    updateItem: mutation.mutateAsync,
    isLoading: mutation.isPending,
    error: mutation.error,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
  };
};
