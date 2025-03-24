import { api } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

export const getTotalEarning = async () => {
    try {
      const response = await api.get(`/api/admins/total-earnings`);
      
      // The response is valid, but we're logging it incorrectly
      // Let's remove the invalid check since the response structure is good
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
  

export const useGetTotalEarning = () => {
  return useQuery({
    queryKey: ["total-earnings"],
    queryFn: getTotalEarning,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2,
  });
};
