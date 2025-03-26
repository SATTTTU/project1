"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";

// Function to delete a cart item
export const deleteCartItem = async ({ item_id }) => {
	try {
		console.log("itm od:", item_id);
		const response = await api.delete(`/api/baskets/delete/item/${item_id}`);
		return response.data;
	} catch (error) {
		console.error("Error deleting item:", error);
		throw new Error("Failed to delete item");
	}
};

export const useDeleteCartItem = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deleteCartItem,
		onMutate: async ({ item_id }) => {
			await queryClient.cancelQueries(["cartItems"]);
			const previousCart = queryClient.getQueryData(["cartItems"]);

			// Optimistically update the cart UI
			queryClient.setQueryData(["cartItems"], (oldCart) => {
				if (!oldCart || !oldCart[0]?.items) return oldCart;

				return [
					{
						...oldCart[0],
						items: oldCart[0].items.filter(
							(item) => item.menu_item_id !== item_id
						),
					},
				];
			});

			return { previousCart };
		},
		onError: (_, __, context) => {
			if (context?.previousCart) {
				queryClient.setQueryData(["cartItems"], context.previousCart);
			}
		},
		onSuccess: () => {
			console.log("Item successfully deleted from the cart");
		},
		onSettled: () => {
			queryClient.invalidateQueries(["cartItems"]);
		},
	});
};
