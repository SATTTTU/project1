import { api } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

export const getUserReview = async (cookId) => {
  const response = await api.get(`/api/get-review/${cookId}`);
  console.log(response.data);
  return response.data;
};
export const useUserReview = (cookId, queryConfig = {}) => {
  return useQuery({
    queryKey: ["reviews", cookId],
    queryFn: () => getUserReview(cookId),
    enabled: !!cookId, // Only fetch if cookId exists
    ...queryConfig, // Ensure queryConfig is correctly applied
  });
};
