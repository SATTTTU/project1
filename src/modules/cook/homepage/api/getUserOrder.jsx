import { api } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

export const fetchUserOrders = async () => {
  const response = await api.get(`/api/cooks/orders/index`); 
  console.log("All orders", response.data)
  return response.data;
};

export const useGetUserOrder = (options = {}) => {
  return useQuery({
    queryKey: ["userOrders"], 
    queryFn: fetchUserOrders,
    onError: (error) => {
      console.error("Error fetching orders:", error);
    },
    ...options,
  });
};
