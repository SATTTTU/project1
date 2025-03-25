import { useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "@/lib/api-client"

export const updateCartItem = async ({ item_id, quantity }) => {
  try {
    const response = await api.put(`/api/baskets/update/item/${item_id}`, { quantity })

    if (!response.data || !response.data.items) {
      throw new Error("Invalid API response")
    }

    return response.data.items // Return the updated cart items
  } catch (error) {
    console.error("Error updating cart item:", error)
    throw new Error("Failed to update cart item.")
  }
}

export const useUpdateStoreItem = (mutationConfig = {}) => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
		mutationFn: updateCartItem,

		// Optimistically update the cache before mutation
		// onMutate: async ({ item_id, quantity }) => {
		// await queryClient.cancelQueries(["cartItems"]) // Cancel ongoing refetches
		// const previousCart = queryClient.getQueryData(["cartItems"]) // Get the current cart state
		// queryClient.setQueryData(["cartItems"], (oldCart) => {
		//   if (!oldCart || !oldCart[1]?.items) return oldCart
		//   const updatedItems = oldCart[1].items.map((item) => (item.item_id === item_id ? { ...item, quantity } : item))
		//   return [
		//     oldCart[0],
		//     {
		//       ...oldCart[1],
		//       items: updatedItems,
		//     },
		//   ]
		// })
		// return { previousCart }
		// },

		// If the mutation fails, revert to the previous cart state
		onError: (error, _, context) => {
			if (context?.previousCart) {
				queryClient.setQueryData(["cartItems"], context.previousCart);
			}
		},

		// After a successful API call, update the cache with the correct data
		onSuccess: (updatedCart) => {
			queryClient.setQueryData(["cartItems"], updatedCart);
		},

		// Always refetch to ensure data consistency
		onSettled: () => {
			queryClient.invalidateQueries(["cartItems"]);
		},

		...mutationConfig,
	});

  return {
    updateItem: mutation.mutateAsync,
    isLoading: mutation.isPending,
    error: mutation.error,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
  }
}

