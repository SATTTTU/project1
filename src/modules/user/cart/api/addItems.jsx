// import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";


export const storeCartItem = async ({ userId, productId, quantity }) => {
  const response = await api.post("/api/baskets/store", {
    user_id: userId,
    product_id: productId,
    quantity: quantity,
  });

  return response.data; // Return the stored cart item details
};


// export const useUserBasket = (userId) => {
//   return useQuery({
//     queryKey: ["userBasket", userId], // Unique cache key
//     queryFn: () => fetchUserBasket(userId),
//     enabled: !!userId, // Only fetch if userId exists
//   });
// };
