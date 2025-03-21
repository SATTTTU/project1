import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api-client';

// API function to fetch menu items
export const getMenuItems = async () => {
  const response = await api.get('/api/cooks/menus-and-items');
  console.log(response.data)
  return response.data;
};

// Define query options for fetching menu items
export const getMenuItemsQueryOptions = () => {
  return {
    queryKey: ['menuItems'],
    queryFn: getMenuItems,
  };
};

// Hook to fetch menu items
export const useMenuItems = (queryConfig = {}) => {
  return useQuery({
    ...getMenuItemsQueryOptions(),
    ...queryConfig,
  });
};