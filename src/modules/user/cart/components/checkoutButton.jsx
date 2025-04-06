import { useState } from "react";
import { toast } from "react-toastify";
import { useCheckout } from "../api/checkout";
import { useUserCart } from "../api/getItems";
import { useNavigate } from "react-router-dom";

export const CheckoutButton = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const { data: cartData } = useUserCart();
  const { mutateAsync: processCheckout } = useCheckout({
    onSuccess: (data) => {
      console.log("Checkout successful:", data);
    },
    onError: (error) => {
      toast.error(error.message || "Checkout failed. Please try again.");
    },
  });

  const calculateTotal = () => {
    if (!cartData || !cartData[0]?.items) return 0;
    return cartData[0].items.reduce(
      (total, item) => total + (item.price * item.quantity || 0),
      0
    );
  };

  const handleCheckout = async () => {
    if (!cartData || !cartData[0]?.items || cartData[0].items.length === 0) {
      toast.error("Your cart is empty. Add items before checking out.");
      return;
    }

    try {
      setIsProcessing(true);

      // Generate a unique order ID
      const orderId = `order_${Date.now()}`;

      const checkoutData = {
        items: cartData[0].items.map((item) => ({
          id: item.item_id,
          quantity: item.quantity,
        })),
        amount: Math.round(calculateTotal() * 100),
        purchase_order_id: orderId,
        purchase_order_name: "Food Order",
        return_url: `${window.location.origin}/payment/callback`,
        website_url: window.location.origin,
      };

      console.log("Sending checkout data:", checkoutData);
      const response = await processCheckout(checkoutData);

      if (response && response.pidx) {
        // Store pidx and redirect to Khalti
        localStorage.setItem("khalti_pidx", response.pidx);
        window.location.href = `https://test-pay.khalti.com/?pidx=${response.pidx}`;
      } else {
        toast.error("Invalid payment response from server. Missing pidx.");
      }
    } catch (error) {
      console.error("Checkout Error:", error);
      toast.error("Checkout failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={isProcessing}
      className={`w-full bg-[#0e9300] text-white py-3 rounded-md font-medium transition-colors ${
        isProcessing ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {isProcessing
        ? "Processing..."
        : `Pay with Khalti • Rs. ${calculateTotal().toFixed(2)}`}
    </button>
  );
};
