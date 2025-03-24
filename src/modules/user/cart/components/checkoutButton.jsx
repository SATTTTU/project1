import { useState } from "react"
import { toast } from "react-toastify"
import { useUserBasket } from "../api/getItems"
import { useCheckout } from "../api/checkout"

export function CheckoutButton() {
  const [isProcessing, setIsProcessing] = useState(false)
  const { data: cartData } = useUserBasket()
  const { mutateAsync: processCheckout } = useCheckout()

  // Calculate total amount
  const calculateTotal = () => {
    if (!cartData || !cartData[1]?.items) return 0
    return cartData[1].items.reduce((total, item) => total + (item.price * item.quantity || 0), 0)
  }

  const handleCheckout = async () => {
    // Check if cart is empty
    if (!cartData || !cartData[1]?.items || cartData[1].items.length === 0) {
      toast.error("Your cart is empty. Add items before checking out.")
      return
    }

    try {
      setIsProcessing(true)

      // Prepare checkout data for Khalti
      const checkoutData = {
        // Cart items
        items: cartData[1].items.map((item) => ({
          id: item.item_id,
          quantity: item.quantity,
          name: item.menu_item?.name || "Product",
          price: item.price,
        })),

        // Payment details
        amount: calculateTotal() * 100, // Convert to paisa (Khalti uses paisa)
        purchase_order_id: `ORDER-${Date.now()}`, // Generate a unique order ID
        purchase_order_name: "Food Order", // Order name

        // Customer details (if available)
        customer_info: {
          name: "Customer Name", // Replace with actual customer name if available
          email: "customer@example.com", // Replace with actual email if available
          phone: "9800000000", // Replace with actual phone if available
        },

        // URLs for redirection
        return_url: `${window.location.origin}/payment/callback`,
        website_url: window.location.origin,

        // Optional metadata
        amount_breakdown: [
          {
            label: "Order Total",
            amount: calculateTotal() * 100,
          },
        ],
        product_details: cartData[1].items.map((item) => ({
          identity: item.item_id,
          name: item.menu_item?.name || "Product",
          total_price: item.price * item.quantity * 100,
          quantity: item.quantity,
          unit_price: item.price * 100,
        })),
      }

      // Process checkout and create Khalti payment
      const response = await processCheckout(checkoutData)

      // Check if we have a payment URL from Khalti
      if (response && response.payment_url) {
        // Store transaction details in localStorage for later verification
        localStorage.setItem(
          "khalti_transaction",
          JSON.stringify({
            pidx: response.pidx,
            expires_at: response.expires_at,
            amount: calculateTotal() * 100,
            order_id: checkoutData.purchase_order_id,
          }),
        )

        console.log("Redirecting to Khalti payment page:", response.payment_url)

        // Redirect to Khalti payment page
        window.location.href = response.payment_url
      } else {
        toast.error("Invalid payment response. Please try again.")
        console.error("Invalid payment response:", response)
      }
    } catch (error) {
      console.error("Checkout error:", error)
      toast.error(error.message || "Checkout failed. Please try again.")
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

