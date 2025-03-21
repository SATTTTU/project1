import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api-client';

// API function to fetch popular cooks
export const search = async ({query}) => {
  const response = await api.get(`/api/search/${query}`);
  return response.data;
};

// Define query options for fetching popular cooks
export const searchQueryOptions = () => {
  return {
    queryKey: ['search'],
    queryFn: search,
  };
};

// Hook to fetch popular cooks
export const useSearch = (queryConfig = {}) => {
  return useQuery({
    ...searchQueryOptions(),
    ...queryConfig,
  });
};