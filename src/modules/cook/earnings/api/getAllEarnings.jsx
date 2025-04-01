import { api } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

export const fetchCookEarning = async () => {
  const response = await api.get(`/api/cooks/earnings`); 
  return response.data;
};

export const useGetUserOrder = (options = {}) => {
  return useQuery({
    queryKey: ["cookEarnings"], 
    queryFn: fetchCookEarning,
    onError: (error) => {
      console.error("Error fetching orders:", error);
    },
    ...options,
  });
};
