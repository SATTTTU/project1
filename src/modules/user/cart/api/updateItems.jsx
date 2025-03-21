import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";

const UpdateUserBasket = async (userId) => {
  if (!userId) return [];
  const response = await api.put("/update/item/{basket_item_id}", {
    params: { user_id: userId },
  });
  return response.data;
};

export const useUserUpdateBasket = (userId) => {
  return useQuery({
    queryKey: ["userBasket", userId],
    queryFn: () => UpdateUserBasket(userId),
    enabled: !!userId,
  });
};
