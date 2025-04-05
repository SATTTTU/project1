import { api } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

export const gettotalearning = async () => {
  try {
    const response = await api.get(`/api/admins/total-earnings`);
    
    console.log("API response:", response); // this will show the actual data

    return { 
      totalEarnings: response?.earnings || "1.00",
      percentageIncrease: response?.percentageIncrease || "0"  // if this doesn't exist, it'll just be "0"
    };
  } catch (error) {
    console.error("Error fetching total earnings:", error);
    return { 
      totalEarnings: "0.00", 
      percentageIncrease: "0"
    };
  }
};


  

export const Usegettotalearning = () => {
  return useQuery({
    queryKey: ["popular-cooks"],
    queryFn: gettotalearning,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2,
  });
};
