import { api } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

export const getAllTransactions = async () => {
  try {
    const response = await api.get(`/api/admins/transactions`);
    console.log("API response:", response.data);
    return { transactions: response.data };
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return { transactions: [] };
  }
};

export const useGetAllTransactions = () => {
  return useQuery({
    queryKey: ["all-transactions"],
    queryFn: getAllTransactions,
    staleTime: 1000 * 60 * 5, 
    retry: 2,
  });
};
