import { api } from "@/lib/api-client"
import { useMutation, useQueryClient } from "@tanstack/react-query"

// Function to add an item to the cart
export const storeCartItem = async ({ menu_item_id, quantity }) => {
  try {
    const response = await api.post("/api/baskets/store", { menu_item_id, quantity })
    console.log("basket ", response.data.items)
    return response.data.items
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to add item to cart.")
  }
}

export const useStoreItem = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: storeCartItem,
    onMutate: async (newItem) => {
      await queryClient.cancelQueries(["cartItems"])

      const previousCart = queryClient.getQueryData(["cartItems"])

      queryClient.setQueryData(["cartItems"], (oldData) => {
        if (!oldData || !oldData[1]?.items) {
          return [
            {},
            {
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
            },
          ]
        }

        return [
          oldData[0],
          {
            ...oldData[1],
            items: [
              ...oldData[1].items,
              {
                item_id: `temp-${Date.now()}`,
                menu_item_id: newItem.menu_item_id,
                quantity: newItem.quantity,
                price: 0, // We don't know the price yet
                menu_item: {
                  name: "Loading...",
                  image_url: null,
                },
                isOptimistic: true,
              },
            ],
          },
        ]
      })

      return { previousCart }
    },
    onSuccess: (updatedCart) => {
      // Update the cart with the actual data from the server
      queryClient.setQueryData(["cartItems"], updatedCart)
    },
    onError: (error, variables, context) => {
      // If the mutation fails, revert to the previous cart state
      if (context?.previousCart) {
        queryClient.setQueryData(["cartItems"], context.previousCart)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(["cartItems"])
    },
  })
}

