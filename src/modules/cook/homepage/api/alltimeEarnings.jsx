import { api } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

export const fetchAllEarnings = async () => {
  const response = await api.get(`/api/cooks/all-time-earning`); 
  console.log("Earnings****", response.data)
  return response.data;
};

export const useAllTimeEarnings = (options = {}) => {
  return useQuery({
    queryKey: ["allTimeEarnings"], 
    queryFn: fetchAllEarnings,
    onError: (error) => {
      console.error("Error fetching orders:", error);
    },
    ...options,
  });
};
