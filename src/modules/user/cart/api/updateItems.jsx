import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";

export const updateCartItem = async ({ item_id, quantity }) => {
	try {
		console.log("update cart *********:", item_id, quantity);
		const response = await api.put(`/api/baskets/update/item/${item_id}`, {
			quantity,
		});
		return response.data;
	} catch (error) {
		console.error("Error updating cart item:", error);
		throw new Error("Failed to update cart item.");
	}
};

export const useUpdateCartItem = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: updateCartItem,
		onMutate: async (item_id, quantity) => {
			console.log("updagted mutation:", item_id, quantity);
			await queryClient.cancelQueries(["cartItems"]);
			const previousCart = queryClient.getQueryData(["cartItems"]);

			// Optimistically update the cart
			queryClient.setQueryData(["cartItems"], (oldCart) => {
				if (!oldCart || !oldCart.items) return oldCart;

				return {
					...oldCart,
					items: oldCart.items.map((item) =>
						item.item_id === item_id ? { ...item, quantity } : item
					),
				};
			});

			return { previousCart };
		},
		onError: (error, _, context) => {
			if (context?.previousCart) {
				queryClient.setQueryData(["cartItems"], context.previousCart);
			}
		},
		onSuccess: () => {},
		onSettled: () => {
			queryClient.invalidateQueries(["cartItems"]);
		},
	});
};
