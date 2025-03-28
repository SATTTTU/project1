import { api } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

const getAllOrders= async () => {
  const response = await api.get("/api/current-orders"); 
  console.log("orders:", response.data);
  return response.data;
};

export const useAllOrders = (queryConfig = {}) => {
  return useQuery({
    queryKey: ["currentOrders"], 
    queryFn: getAllOrders,
    ...queryConfig,
  });
};
