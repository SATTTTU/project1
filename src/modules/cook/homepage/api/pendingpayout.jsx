import { api } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

export const fetchPendingPayout = async () => {
  const response = await api.get(`/api/cooks/pending-payout`); 
  console.log("Pendings payout****", response.data)
  return response.data;
};

export const usePendingPayout = (options = {}) => {
  return useQuery({
    queryKey: ["pendingpayout"], 
    queryFn: fetchPendingPayout,
    onError: (error) => {
      console.error("Error fetching orders:", error);
    },
    ...options,
  });
};
