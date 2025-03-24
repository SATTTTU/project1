import { api } from "@/lib/api-client";
import { clearCart } from "@/store/cart/cart";
import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";

const checkout = async (cartItems) => {
  try {
    const response = await api.post("/api/checkout", { items: cartItems });
    console.log("Checkout Successful:", response.data);
    return response.data;
  } catch (error) {
    console.error("Checkout Error:", error.response?.data || error.message);
    throw error; // Ensure error is propagated
  }
};

export const useCheckout = ({ mutationConfig } = {}) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  return useMutation({
    mutationFn: () => checkout(cartItems),
    onSuccess: () => {
      dispatch(clearCart()); // Clear cart after successful checkout
    },
    onError: (error) => {
      console.error("Checkout failed:", error);
    },
    ...mutationConfig,
  });
};
