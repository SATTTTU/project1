import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { storeCartItem } from "../api/addItems";

export const useStoreCartItem = () => {
  const queryClient = useQueryClient(); 

  return useMutation({
    mutationFn: storeCartItem, 
    onSuccess: (data) => {
        console.log("data",data)
      toast.success("Item added to cart successfully! 🛒");

      
      queryClient.invalidateQueries(["userBasket"]);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to add item to cart!");
    },
  });
};
