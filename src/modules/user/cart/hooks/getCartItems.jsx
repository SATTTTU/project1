import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";

/**
 * Fetches the user's basket/cart items from the API
 * @param {string|number} userId - The ID of the user whose basket we're fetching
 * @returns {Object} - React Query result with basket data
 */
export const useUserBasket = (userId) => {
  return useQuery({
    queryKey: ["userBasket", userId],
    queryFn: async () => {
      if (!userId) {
        throw new Error("User ID is required to fetch basket");
      }
      
      const response = await api.get("/api/baskets/index", {
        params: { user_id: userId },
      });
      
      return response.data;
    },
    enabled: !!userId, // Only run the query if userId exists
    staleTime: 60000, // Consider data fresh for 1 minute
    refetchOnWindowFocus: true, // Refetch when window regains focus
    refetchOnMount: true, // Refetch when component mounts
    retry: 3, // Retry failed requests 3 times
  });
};