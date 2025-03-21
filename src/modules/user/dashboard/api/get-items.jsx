import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api-client';

// API function to fetch menu items by menuId
export const getMenuItems = async (menuId) => {
  if (!menuId) throw new Error('menuId is required');

  try {
    const response = await api.get(`/api/cooks/all-menu-items/${menuId}`);
    return response.data; // Ensure API returns an array of menu items
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch menu items");
  }
};

// Define query options for fetching menu items by menuId
export const getMenuItemsQueryOptions = (menuId) => ({
  queryKey: ['menuItems', menuId], // Ensure caching per menuId
  queryFn: () => getMenuItems(menuId),
});

// Hook to fetch menu items by menuId
export const useMenuItems = (menuId, queryConfig = {}) => {
  return useQuery({
    ...getMenuItemsQueryOptions(menuId),
    ...queryConfig,
    enabled: !!menuId, // Prevent query execution when menuId is undefined
  });
};
