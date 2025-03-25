"use client"

import { useState } from "react"
import { toast } from "react-toastify"
import { useUserBasket } from "../api/getItems"
import { useCheckout } from "../api/checkout"

export function CheckoutButton() {
  const [isProcessing, setIsProcessing] = useState(false)
  const { data: cartData } = useUserBasket()

  const { mutateAsync: processCheckout } = useCheckout({
    onSuccess: (data) => {
      console.log("Checkout successful:", data)
    },
    onError: (error) => {
      console.error("Checkout error:", error)
      toast.error(error.message || "Checkout failed. Please try again.")
    },
  })

  const calculateTotal = () => {
    if (!cartData || !cartData[1]?.items) return 0
    return cartData[1].items.reduce((total, item) => total + (item.price * item.quantity || 0), 0)
  }

  const handleCheckout = async () => {
    if (!cartData || !cartData[1]?.items || cartData[1].items.length === 0) {
      toast.error("Your cart is empty. Add items before checking out.")
      return
    }

    try {
      setIsProcessing(true)

      const checkoutData = {
        // Cart items
        items: cartData[1].items.map((item) => ({
          id: item.item_id,
          quantity: item.quantity,
        })),

        // Total amount (convert to paisa for Khalti)
        amount: Math.round(calculateTotal() * 100),

        // Order details
        purchase_order_id: `ORDER-${Date.now()}`,
        purchase_order_name: "Food Order",

        // Redirect URLs
        return_url: `${window.location.origin}/payment/callback`,
        website_url: window.location.origin,
      }

      console.log("Sending checkout data:", checkoutData)

      // Use mutateAsync to get the response data
      const response = await processCheckout(checkoutData)

      console.log("Checkout response:", response)

      // Check if response exists and has pidx
      if (response && response.pidx) {
        try {
          // Store pidx directly in localStorage (as a separate item)
          localStorage.setItem("khalti_pidx", response.pidx)
          console.log("Stored pidx in localStorage:", response.pidx)

          const transactionDetails = {
            pidx: response.pidx,
            expires_at: response.expires_at || null,
            amount: Math.round(calculateTotal() * 100),
            order_id: checkoutData.purchase_order_id,
            timestamp: new Date().toISOString(),
          }

          localStorage.setItem("khalti_transaction", JSON.stringify(transactionDetails))
          console.log("Stored transaction details:", transactionDetails)

          // Verify localStorage was set correctly
          const storedPidx = localStorage.getItem("khalti_pidx")
          if (!storedPidx) {
            console.error("Failed to store pidx in localStorage")
            toast.warning("Warning: Could not store payment information locally")
          }

          // IMPORTANT: Construct the correct Khalti payment URL
          const khaltiPaymentUrl = `https://test-pay.khalti.com/?pidx=${response.pidx}`

          console.log("Redirecting to Khalti payment page:", khaltiPaymentUrl)

          // Redirect to Khalti payment page
          window.location.href = khaltiPaymentUrl
        } catch (storageError) {
          console.error("Error storing data in localStorage:", storageError)
          toast.warning("Warning: Could not store payment information locally")

          // Still redirect even if localStorage fails
          window.location.href = `https://test-pay.khalti.com/?pidx=${response.pidx}`
        }
      } else {
        // More detailed error message
        const errorMsg = "Invalid payment response from server. Missing pidx."
        console.error(errorMsg, { response })
        toast.error(errorMsg)
      }
    } catch (error) {
      // Improved error handling
      const errorMsg = error.response?.data?.message || error.message || "Checkout failed. Please try again."
      console.error("Checkout error:", error)
      toast.error(errorMsg)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <button
      onClick={handleCheckout}
      disabled={isProcessing}
      className={`w-full bg-green-500 text-white py-3 rounded-md font-medium hover:bg-green-600 transition-colors ${
        isProcessing ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {isProcessing ? "Processing..." : `Pay with Khalti • Rs. ${calculateTotal().toFixed(2)}`}
    </button>
  )
}

