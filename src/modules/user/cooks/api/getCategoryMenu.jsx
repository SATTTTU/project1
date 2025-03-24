import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api-client';

// API function to fetch menu items by cook ID
export const getCategoryMenu = async (menuId) => {
  if (!menuId) {
    throw new Error('Cook ID is required');
  }
  
  const response = await api.get(`/api/cooks/all-menu-items/${menuId}`);
  console.log("menu inside category",response.data)
  return response.data;
};

// Define query options for fetching menu items
export const getCategoryMenuItemsQueryOptions = (menuId) => {
  return {
    queryKey: ['categoryItems', menuId],
    queryFn: () => getCategoryMenu(menuId),
    enabled: !!menuId, // Only run the query if menuId exists
  };
};

// Hook to fetch menu items
export const useCategoryMenuItems = (menuId, queryConfig = {}) => {
  return useQuery({
    ...getCategoryMenuItemsQueryOptions(menuId),
    ...queryConfig,
  });
};