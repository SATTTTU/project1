"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";

// Function to delete the entire basket
export const deleteBasket = async () => {
    try {
        const response = await api.delete(`/api/baskets/delete`);
        return response.data;
    } catch (error) {
        console.error("Error deleting basket:", error);
        throw new Error("Failed to delete basket");
    }
};

export const useDeleteBasket = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteBasket,
        onMutate: async () => {
            await queryClient.cancelQueries(["cartItems"]);
            const previousCart = queryClient.getQueryData(["cartItems"]);

            // Optimistically clear the cart UI
            queryClient.setQueryData(["cartItems"], []);

            return { previousCart };
        },
        onError: (_, __, context) => {
            if (context?.previousCart) {
                queryClient.setQueryData(["cartItems"], context.previousCart);
            }
        },
        onSuccess: () => {
            console.log("Basket successfully deleted");
        },
        onSettled: () => {
            queryClient.invalidateQueries(["cartItems"]);
        },
    });
};
