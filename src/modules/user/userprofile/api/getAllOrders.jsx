import { api } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

// Fetch User Profile API
const getAllOrders= async () => {
  const response = await api.get("/api/all-orders"); 
  console.log("orders:", response.data);
  return response.data;
};

export const useAllOrders = (queryConfig = {}) => {
  return useQuery({
    queryKey: ["orderHistory"], 
    queryFn: getAllOrders,
    ...queryConfig,
  });
};
