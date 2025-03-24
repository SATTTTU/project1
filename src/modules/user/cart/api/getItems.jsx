import { api } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

// Fetch cart items from API
export const getCartItems = async () => {
  const response = await api.get("/api/baskets/index");
  console.log("data 0f basket", response.data[1].items)
  return  response.data;
};

export const useUserBasket = () => {
  return useQuery({
    queryKey: ["cartItems"],
    queryFn: getCartItems,
    staleTime: 1000 * 60 * 5, 
    refetchOnWindowFocus: false, 
  });
};

