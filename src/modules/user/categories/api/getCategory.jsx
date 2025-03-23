import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api-client';

// API function to fetch menu items by cook ID
export const getCategory = async (menuId) => {
    console.log("menuId", menuId)
  if (!menuId) {
    throw new Error('menu ID is required');
  }
  
  const response = await api.get(`/api/cooks/all-menu-items/${menuId}`);
  console.log(response.data)
  return response.data;
};

// Define query options for fetching menu items
export const getMenuItemsQueryOptions = (menuId) => {
  return {
    queryKey: ['category', menuId],
    queryFn: () => getCategory(menuId),
    enabled: !!menuId, // Only run the query if menuId exists
  };
};

// Hook to fetch menu items
export const useAllCategoryItems = (menuId, queryConfig = {}) => {
    console.log("menuId", menuId)
  return useQuery({
    ...getMenuItemsQueryOptions(menuId),
    ...queryConfig,
  });
};