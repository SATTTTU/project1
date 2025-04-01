import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api-client';

// API function to fetch menu items by cook ID
export const getCategory = async (cookId) => {
  if (!cookId) {
    throw new Error('Cook ID is required');
  }
  
  const response = await api.get(`/api/cooks/menus-and-items/${cookId}`);
  return response.data;
};

// Define query options for fetching menu items
export const getMenuItemsQueryOptions = (cookId) => {
  return {
    queryKey: ['category', cookId],
    queryFn: () => getCategory(cookId),
    enabled: !!cookId, // Only run the query if cookId exists
  };
};

// Hook to fetch menu items
export const useCategoryItems = (cookId, queryConfig = {}) => {
  return useQuery({
    ...getMenuItemsQueryOptions(cookId),
    ...queryConfig,
  });
};