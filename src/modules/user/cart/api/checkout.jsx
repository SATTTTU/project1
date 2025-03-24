import { useMutation } from "@tanstack/react-query"
import { api } from "@/lib/api-client"

// Function to create a payment with Khalti
export const processCheckout = async (checkoutData) => {
  try {
    // Send checkout data to your backend
    const response = await api.post("/api/checkout", checkoutData)

    // Log the response for debugging
    console.log("Khalti payment creation response:", response.data)

    // Return the response data which should contain payment_url
    return response.data
  } catch (error) {
    console.error("Checkout error:", error)
    throw new Error(error.response?.data?.message || "Failed to process checkout")
  }
}

// React Query hook for checkout
export const useCheckout = (mutationConfig = {}) => {
  return useMutation({
    mutationFn: processCheckout,
    ...mutationConfig,
  })
}

