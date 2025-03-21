import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";

const fetchUserBasket = async (userId) => {
  if (!userId) return [];
  const response = await api.get("/api/baskets/index", {
    params: { user_id: userId },
  });
  return response.data;
};

export const useUserBasket = (userId) => {
  return useQuery({
    queryKey: ["userBasket", userId],
    queryFn: () => fetchUserBasket(userId),
    enabled: !!userId,
  });
};
