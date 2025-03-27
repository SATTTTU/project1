import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api-client';

// API function to fetch popular cooks
export const getPopularCooks = async () => {
  const response = await api.get('/api/get-popular-cooks');
  console.log("popular cooks ", response.data)
  return response.data;
};

// Define query options for fetching popular cooks
export const getPopularCooksQueryOptions = () => {
  return {
    queryKey: ['popularCooks'],
    queryFn: getPopularCooks,
  };
};

// Hook to fetch popular cooks
export const usePopularCooks = (queryConfig = {}) => {
  return useQuery({
    ...getPopularCooksQueryOptions(),
    ...queryConfig,
  });
};