import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";

// API function to fetch popular dishes
export const getPopularDishes = async () => {
  try {
    const response = await api.get("/api/get-popular-dishes");

    console.log("API Response:", response.data); // Debugging

    // Ensure we return the correct structure
    return response.data?.data || response.data;
  } catch (error) {
    console.error("Error fetching popular dishes:", error);
    throw new Error("Failed to fetch popular dishes");
  }
};

// Query options for react-query
export const getPopularDishesQueryOptions = () => ({
  queryKey: ["popularDishes", "list"], // Unique key
  queryFn: getPopularDishes,
});

// Hook to use in components
export const usePopularDishes = (queryConfig = {}) => {
  return useQuery({
    ...getPopularDishesQueryOptions(),
    ...queryConfig,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });
};
