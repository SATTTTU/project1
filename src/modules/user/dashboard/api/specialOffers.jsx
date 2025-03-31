import { api } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

export const getDiscountMenu = async (cookId) => {
  try {
    const response = await api.get(`/api/discounted-menu-items/${cookId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching discounted menu items:", error);
    return []; // Return an empty array as a fallback
  }
};

export const useDiscountMenu = (cookId, queryConfig = {}) => {
  return useQuery({
    queryKey: ["specialoffers", cookId],
    queryFn: () => getDiscountMenu(cookId),
    enabled: !!cookId, // Fetch only if cookId exists
    staleTime: 5 * 60 * 1000, // Cache results for 5 minutes
    retry: 2, // Retry up to 2 times if the request fails
    ...queryConfig,
  });
};
