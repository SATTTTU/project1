import { useMutation } from "@tanstack/react-query"
import { api } from "@/lib/api-client"

export const processCheckout = async (checkoutData) => {
  try {
    console.log("Making checkout API request with data:", checkoutData)
    const response = await api.post("/api/checkout", checkoutData)
    console.log("checkout reponse",response.data)

    if (!response) {
      throw new Error("Invalid response from server")
    }

    console.log("Checkout API response data:", response.data)

    return response
  } catch (error) {
    console.error("Checkout API error:", error)

    const errorMessage =
      error.response?.data?.message || error.response?.data?.error || error.message || "Failed to process checkout"

    throw new Error(errorMessage)
  }
}

export function useCheckout(mutationConfig = {}) {
  return useMutation({
    mutationFn: processCheckout,
    ...mutationConfig,
    onError: (error) => {
      console.error("Checkout mutation error:", error)
      if (mutationConfig.onError) {
        mutationConfig.onError(error)
      }
    },
  })
}

