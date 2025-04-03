import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";

// API function to fetch popular dishes
export const getAllDishes = async () => {
  try {
    const response = await api.get("/api/list-all-dishes");

    console.log("All Dishes", response.data); // Debugging

    // Ensure we return the correct structure
    return response.data?.data || response.data;
  } catch (error) {
    console.error("Error fetching popular dishes:", error);
    throw new Error("Failed to fetch popular dishes");
  }
};

// Query options for react-query
export const getAllDishesQueryOptions = () => ({
  queryKey: ["AllDishes"], 
  queryFn: getAllDishes,
});

export const useAllDishes = (queryConfig = {}) => {
  return useQuery({
    ...getAllDishesQueryOptions(),
    ...queryConfig,
    staleTime: 5 * 60 * 1000, // Cache fo
  });
};
