import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api-client';

// API function to fetch popular cooks
export const getAllReviews = async () => {
  const response = await api.get('/api/list-all-reviews');
  console.log("Reviews****8 ", response.data)
  return response.data;
};

// Define query options for fetching popular cooks
export const getAllReviewsQueryOptions = () => {
  return {
    queryKey: ['allReviews'],
    queryFn: getAllReviews,
  };
};

// Hook to fetch popular cooks
export const useAllReviews = (queryConfig = {}) => {
  return useQuery({
    ...getAllReviewsQueryOptions(),
    ...queryConfig,
  });
};