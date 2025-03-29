import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";

// API call to update the order status
const updateOrderStatus = async ({ order_id, status }) => {
  try {
      console.log("Updating order status:", order_id, status);
      const response = await api.post(`/api/cooks/orders/${order_id}/update?_method=put`, { status });
    return response.data;
  } catch (error) {
    console.error("Error updating order status:", error);
    throw new Error("Failed to update order status.");
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
      if (context?.previousOrders) {
        queryClient.setQueryData(["orders"], context.previousOrders);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["orders"]); // Refresh orders list
    },
    onSettled: () => {
      queryClient.invalidateQueries(["orders"]); // Ensures fresh data after mutation
    },
  });
};
