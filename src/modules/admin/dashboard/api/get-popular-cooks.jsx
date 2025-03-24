import { api } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

export const getPopularCooks = async () => {
    try {
      const response = await api.get(`/api/admins/total-earnings`);
      
      console.log("API response:", response.data);
      
      return { 
        totalEarnings: response.data?.earnings || "1.00",
        percentageIncrease: response.data.percentageIncrease || "0" 
      };
    } catch (error) {
      console.error("Error fetching total earnings:", error);
      return { 
        totalEarnings: "0.00", 
        percentageIncrease: "0" 
      };
    }
  };
  

export const UsegetPopularCooks = () => {
  return useQuery({
    queryKey: ["popular-cooks"],
    queryFn: getPopularCooks,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2,
  });
};
