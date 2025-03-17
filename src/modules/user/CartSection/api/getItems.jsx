import { api } from "@/lib/api-client"; // Assuming axios instance is configured

// Fetch cart items
export const fetchCartItems = async () => {
    const response = await api.get("/baskets/index");
    return response.data;
};

// Add an item to the cart
export const addToCart = async (itemData) => {
    const response = await api.post("/baskets/store", itemData);
    return response.data;
};

// Update a cart item
export const updateCartItem = async ({ basket_item_id, quantity }) => {
    const response = await api.put(`/baskets/update/item/${basket_item_id}`, { quantity });
    return response.data;
};

// Remove a cart item
export const removeCartItem = async (basket_item_id) => {
    const response = await api.delete(`/baskets/delete/item/${basket_item_id}`);
    return response.data;
};

// Clear entire cart
export const clearCart = async () => {
    const response = await api.delete("/baskets/delete");
    return response.data;
};
