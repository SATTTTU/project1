import { api } from "@/lib/api-client";


export const storeCartItem = async ({ userId, productId, quantity }) => {
  const response = await api.post("/api/baskets/store", {
		user_id: userId,
		items: [{ product_id: productId, quantity: quantity }],
	});
	return response.data;
};


