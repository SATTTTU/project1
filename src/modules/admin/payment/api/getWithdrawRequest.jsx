import { api } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

export const getWithdrawalRequests = async () => {
  try {
    const response = await api.get(`/api/admins/withdraw-requests`);
    console.log("API response:", response.data);
    return response.data; // Assuming API returns an array of transactions
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return [];
  }
};

export const useGetAllWithdrawRequests = () => {
  return useQuery({
    queryKey: ["all-withdrawrequest"],
    queryFn: getWithdrawalRequests,
    staleTime: 1000 * 60 * 5, 
    retry: 2,
  });
};
