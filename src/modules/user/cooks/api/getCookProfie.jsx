import { api } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

export const getSingleCook = async (cookId) => {
  const response = await api.get(`/api/get-cook-profile/${cookId}`);
  console.log(response.data);
  return response.data;
};

export const useGetSingleCook = (cookId, { queryConfig } = {}) => {
  return useQuery({
    queryKey: ["cookProfile", cookId],
    queryFn: () => getSingleCook(cookId),
    enabled: !!cookId, // Only fetch if cookId exists
    ...queryConfig,
  });
};
