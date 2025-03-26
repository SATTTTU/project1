import { useMutation } from "@tanstack/react-query"
import { api } from "@/lib/api-client"



// Function to verify payment with Khalti
export const verifyPayment = async (paymentData) => {
  try {
    console.log("Verifying payment with data:", paymentData)

    if (!paymentData.pidx) {
      throw new Error("Missing payment ID (pidx)")
    }

    const response = await api.post("/api/verify-payment", paymentData)

    if (!response || !response.data) {
      throw new Error("Empty response from verification server")
    }

    console.log("Payment verification response:", response.data)

    // Store verified transaction data for order success page
    if (response.data.success) {
      localStorage.setItem(
        "verified_transaction",
        JSON.stringify({
          ...paymentData,
          ...response.data,
          verified: true,
        }),
      )
    }

    return response.data
  } catch (error) {
    console.error("Payment verification error:", error)

    // Extract error message from response if available
    const errorMessage =
      error.response?.data?.message || error.response?.data?.error || error.message || "Payment verification failed"

    throw new Error(errorMessage)
  }
}

export const useVerifyPayment=(mutationConfig = {})=> {
  return useMutation({
    mutationFn: verifyPayment,
    ...mutationConfig,
    onError: (error) => {
      console.error("Verification mutation error:", error)
      if (mutationConfig.onError) {
        mutationConfig.onError(error)
      }
    },
  })
}



