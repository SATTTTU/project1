// api/getCookStatus.js

import { api } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

export const getCookStatus = async (cookId) => {
  const response = await api.get(`/api/get-cooks-available-status/${cookId}`);
  console.log("cookStatus:", response.data);
  return response.data;
};

export const useGetCookStatus = (cookId, queryConfig = {}) => {
  return useQuery({
    queryKey: ["cookStatus", cookId],
    queryFn: () => getCookStatus(cookId),
    enabled: !!cookId,
    ...queryConfig,
  });
};
