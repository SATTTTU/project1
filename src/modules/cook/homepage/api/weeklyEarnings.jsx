import { api } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

export const fetchWeekEarnings = async () => {
  const response = await api.get(`/api/cooks/weekly-earning`); 
  console.log("Earnings****", response.data)
  return response.data;
};

export const useWeeklyEarnings = (options = {}) => {
  return useQuery({
    queryKey: ["allWeeklyEarnings"], 
    queryFn: fetchWeekEarnings,
    onError: (error) => {
      console.error("Error fetching orders:", error);
    },
    ...options,
  });
};
