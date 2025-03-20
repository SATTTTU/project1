import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api-client';

// API function to fetch menu items
export const getCategory = async () => {
  const response = await api.get('/api/cooks/get-menu');
  return response.data;
};

// Define query options for fetching menu items
export const getMenuItemsQueryOptions = () => {
  return {
    queryKey: ['category'],
    queryFn: getCategory,
  };
};

// Hook to fetch menu items
export const useCategoryItems = (queryConfig = {}) => {
  return useQuery({
    ...getMenuItemsQueryOptions(),
    ...queryConfig,
  });
};