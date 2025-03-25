import { api } from "@/lib/api-client"
import { useQuery } from "@tanstack/react-query"

// Fetch cart items from API
export const getCartItems = async () => {
  const response = await api.get("/api/baskets/index")
   console.log("getCart", response.data);
  return response.data
}

export const useUserBasket = () => {
  return useQuery({
    queryKey: ["cartItems"], // Must match the key used in invalidations
    queryFn: getCartItems,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  })
}

