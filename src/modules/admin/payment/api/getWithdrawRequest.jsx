import { api } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

export const getWithdrawalRequests = async () => {
  try {
    const response = await api.get(`/api/admins/withdraw-requests`);
    console.log("API raw response:", response);
    console.log("API data response:", response);

    // ✅ Return only the array of requests
    return response?.requests || [];
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

