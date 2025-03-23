import { api } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

const fetchMenuItem = async (menuItem_Id) => {
  try {
    const response = await api.get(`/api/cooks/get-menu-item/${menuItem_Id}`);
    console.log("Menu Item fetch response:", response.data);

    if (!response.data) {
      throw new Error("No menu item found in the response");
    }

    return [response.data]; // Wrap the single object in an array
  } catch (error) {
    console.error("Fetch menu item error:", error);
    throw error;
  }
};

// Custom Hook to Fetch Menu Item
export const useMenuItem = ({ menuItem_Id, queryConfig } = {}) => {
  const query = useQuery({
    queryKey: ["menuItem", menuItem_Id],
    queryFn: () => fetchMenuItem(menuItem_Id),
    enabled: !!menuItem_Id, // Only fetch if menuItem_Id exists
    ...queryConfig,
  });

  return {
    data: query.data || [],
    isLoading: query.isLoading,
    error: query.error,
    isError: query.isError,
    isSuccess: query.isSuccess,
  };
};
