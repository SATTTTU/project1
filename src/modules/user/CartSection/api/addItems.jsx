import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";

const fetchUserBasket = async (userId) => {
  const response = await api.post("/api/baskets/store", {
    params: { user_id: userId }, // Use query parameters
  });
  return response.data; // Return the basket items
};

export const useUserBasket = (userId) => {
  return useQuery({
    queryKey: ["userBasket", userId], // Unique cache key
    queryFn: () => fetchUserBasket(userId),
    enabled: !!userId, // Only fetch if userId exists
  });
};
