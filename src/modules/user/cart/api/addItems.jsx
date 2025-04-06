import { api } from "@/lib/api-client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
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

  return useMutation({
    mutationFn: storeCartItem,
 
    onSuccess: () => {
      queryClient.invalidateQueries(["cartItems"])
      
    },
    onError: (error, variables, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(["cartItems"], context.previousCart)
      }
     
    },
  
  })
}

