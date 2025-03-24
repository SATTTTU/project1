import { useMutation } from "@tanstack/react-query"
import { api } from "@/lib/api-client"

export const processCheckout = async (cartData) => {
  try {
    const response = await api.post("/api/checkout", cartData)
    console.log("checkout ", response.data)
    return response.data
  } catch (error) {
    console.error("Checkout error:", error)
    throw new Error("Failed to process checkout")
  }
}

export const useCheckout = (mutationConfig = {}) => {
  return useMutation({
    mutationFn: processCheckout,
    ...mutationConfig,
  })
}

