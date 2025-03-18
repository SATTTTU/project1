import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { storeCartItem } from "../api/addItems";

export const useStoreCartItem = () => {
  const queryClient = useQueryClient(); // Helps update cache after mutation

  return useMutation({
    mutationFn: storeCartItem, // API function to add item to cart
    onSuccess: (data) => {
        console.log("data",data)
      toast.success("Item added to cart successfully! 🛒");

      // Invalidate and refetch the user basket query to show updated data
      queryClient.invalidateQueries(["userBasket"]);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to add item to cart!");
    },
  });
};
