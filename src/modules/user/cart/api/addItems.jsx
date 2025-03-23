import { api } from "@/lib/api-client"; 

export const storeCartItem = async ({ menu_item_id, quantity }) => {
  const response = await api.post("/api/baskets/store", {
    menu_item_id,
    quantity,
  });
  console.log(response.data)
  return response.data;
};
