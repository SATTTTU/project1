import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { fetchCartItems, storeCartItem, removeCartItem } from "../../cart/api/addItems";

export const useStoreCart = () => {
  const queryClient = useQueryClient();

  // Fetch Cart Items
  const { data: cartItems, isLoading } = useQuery(["cart"], fetchCartItems);

  // Add Item Mutation
  const addToCart = useMutation(storeCartItem, {
    onSuccess: () => {
      toast.success("Item added to cart successfully! 🛒");
      queryClient.invalidateQueries(["cart"]); // Refresh cart
    },
    onError: () => {
      toast.error("Failed to add item to cart!");
    },
  });

  // Remove Item Mutation
  const removeFromCart = useMutation(removeCartItem, {
    onSuccess: () => {
      toast.success("Item removed from cart!");
      queryClient.invalidateQueries(["cart"]);
    },
    onError: () => {
      toast.error("Failed to remove item from cart!");
    },
  });

  return { cartItems, isLoading, addToCart, removeFromCart };
};
