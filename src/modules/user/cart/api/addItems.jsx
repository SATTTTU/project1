import { api } from "@/lib/api-client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
// Function to add an item to the cart
export const storeCartItem = async ({ menu_item_id, quantity }) => {
  try {
    const response = await api.post("/api/baskets/store", { menu_item_id, quantity })
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to add item to cart.")
  }
}

export const useAddCartItem=()=> {
  const queryClient = useQueryClient()
  // const { toast } = useToast()

  return useMutation({
    mutationFn: storeCartItem,
    onMutate: async (newItem) => {
      await queryClient.cancelQueries(["cartItems"])

      const previousCart = queryClient.getQueryData(["cartItems"])

      // Optimistically update the cart
      queryClient.setQueryData(["cartItems"], (oldData) => {
        if (!oldData || !oldData.items) {
          return {
            items: [
              {
                item_id: `temp-${Date.now()}`,
                menu_item_id: newItem.menu_item_id,
                quantity: newItem.quantity,
                price: 0,
                menu_item: {
                  name: "Loading...",
                  image_url: null,
                },
                isOptimistic: true,
              },
            ],
          }
        }

        return {
          ...oldData,
          items: [
            ...oldData.items,
            {
              item_id: `temp-${Date.now()}`,
              menu_item_id: newItem.menu_item_id,
              quantity: newItem.quantity,
              price: 0,
              menu_item: {
                name: "Loading...",
                image_url: null,
              },
              isOptimistic: true,
            },
          ],
        }
      })

      return { previousCart }
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["cartItems"], data)
    
    },
    onError: (error, variables, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(["cartItems"], context.previousCart)
      }
     
    },
    onSettled: () => {
      queryClient.invalidateQueries(["cartItems"])
    },
  })
}

