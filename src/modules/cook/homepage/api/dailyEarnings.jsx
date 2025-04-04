import { api } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

export const fetchDailyEarnings = async () => {
  const response = await api.get(`/api/cooks/daily-earning`); 
  console.log("Earnings****", response.data)
  return response.data;
};

export const useDailyEarnings = (options = {}) => {
  return useQuery({
    queryKey: ["allWeeklyEarnings"], 
    queryFn: fetchDailyEarnings,
    onError: (error) => {
      console.error("Error fetching orders:", error);
    },
    ...options,
  });
};
