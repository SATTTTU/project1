import { api } from "@/lib/api-client"
import { useQuery } from "@tanstack/react-query"



// Fetch cart items from API
export const getCartItems = async () => {
  const response = await api.get("/api/baskets/index")
  console.log("Cart data:", response.data)
  return response.data
}

export const useUserCart=()=> {
  return useQuery({
    queryKey: ["cartItems"],
    queryFn: getCartItems,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  })
}

