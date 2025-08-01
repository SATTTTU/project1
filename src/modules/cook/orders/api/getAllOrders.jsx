import { api } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

const getAllOrders = async () => {
  const response = await api.get("/api/cooks/orders/index"); 
  console.log("orders:", response.data);
  return response.data;
};

export const useAllOrders = (queryConfig = {}) => {
  return useQuery({
		queryKey: ["orders"],
		queryFn: getAllOrders,
		...queryConfig,
	});
};
