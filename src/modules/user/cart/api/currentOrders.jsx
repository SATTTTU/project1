import { api } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

// Fetch User Profile API
const getCurrentOrders= async () => {
  const response = await api.get("/api/current-orders"); 
  console.log("current orders:", response.data);
  return response.data;
};

export const useCurrentOrders = (queryConfig = {}) => {
  return useQuery({
    queryKey: ["currentorder"], 
    queryFn: getCurrentOrders,
    ...queryConfig,
  });
};
