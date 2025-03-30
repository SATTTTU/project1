import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";

// API call to update the order status
const updateOrderStatus = async ({ order_id, status }) => {
  try {
    console.log("Updating order:", order_id, "Status:", status);
    const response = await api.put(`/api/cooks/orders/${order_id}/update`, { status });
    console.log("OrderStatus", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating order status:", error);

    // Extract server error message if available
    const errorMessage =
      error.response?.data?.message || "Failed to update order status. Please try again.";
    throw new Error(errorMessage);
  }
};

// Custom hook to update order status
export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateOrderStatus,
    onMutate: async ({ order_id, status }) => {
      console.log("Mutating order status:", order_id, status);

      await queryClient.cancelQueries(["orders"]);
      const previousOrders = queryClient.getQueryData(["orders"]);

      // Optimistically update order status
      queryClient.setQueryData(["orders"], (oldOrders) => {
        if (!oldOrders || !Array.isArray(oldOrders)) return oldOrders;

        return oldOrders.map((order) =>
          order.id === order_id ? { ...order, status } : order
        );
      });

      return { previousOrders };
    },
    onError: (error, _, context) => {
      console.error("Mutation error:", error.message);
      if (context?.previousOrders) {
        queryClient.setQueryData(["orders"], context.previousOrders);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["orders"]); // Refresh orders list
    },
  });
};
