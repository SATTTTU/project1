import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchCartItems, addToCart, updateCartItem, removeCartItem, clearCart } from "@/modules/user/cart/api/getItems";

export const useCart = () => {
  const queryClient = useQueryClient();

  // Fetch cart items
  const { data: cartItems = [], isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: fetchCartItems,
  });

  // Mutations
  const addMutation = useMutation(addToCart, {
    onSuccess: () => queryClient.invalidateQueries(["cart"]),
  });

  const updateMutation = useMutation(updateCartItem, {
    onSuccess: () => queryClient.invalidateQueries(["cart"]),
  });

  const removeMutation = useMutation(removeCartItem, {
    onSuccess: () => queryClient.invalidateQueries(["cart"]),
  });

  const clearMutation = useMutation(clearCart, {
    onSuccess: () => queryClient.invalidateQueries(["cart"]),
  });

  return {
    cartItems,
    isLoading,
    addMutation,
    updateMutation,
    removeMutation,
    clearMutation,
  };
};
