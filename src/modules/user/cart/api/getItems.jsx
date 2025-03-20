import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";

// Fetch user basket items
const fetchUserBasket = async (userId) => {
  const response = await api.get("/api/baskets/index", {
    params: { user_id: userId }, // Fetch cart items by user ID
  });
  return response.data; // Return the basket items
};

// React Query hook to fetch the basket
export const useUserBasket = (userId) => {
  return useQuery({
    queryKey: ["userBasket", userId], // Unique cache key for React Query
    queryFn: () => fetchUserBasket(userId),
    enabled: !!userId, // Only fetch if userId exists
  });
};
