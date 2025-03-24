import { api } from "@/lib/api-client"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"

// Function to delete cart item
export const deleteCartItem = async ({ item_id }) => {
  try {
    const response = await api.delete(`/api/baskets/delete/item/${item_id}`)
    return response.data
  } catch (error) {
    console.error("Error deleting item:", error)
    throw new Error("Failed to delete item")
  }
}

// React Query Hook for deleting an item
export const useDeleteStoreItem = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteCartItem,
    onSuccess: () => {
      // Invalidate the query to refetch the latest cart data
      queryClient.invalidateQueries(["cartItems"])
    },
    onError: () => {
      toast.error("Failed to remove item. Please try again.")
    },
  })
}

