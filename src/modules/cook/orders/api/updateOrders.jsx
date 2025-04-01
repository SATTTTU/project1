import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";

const updateOrderStatus = async ({ order_id, status }) => {
  try {
    console.log("Updating order:", order_id, "Status:", status);
    const response = await api.put(`/api/cooks/orders/${order_id}/update`, { newStatus:status });
    console.log("OrderStatus", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating order status:", error);
    const errorMessage =
      error.response?.data?.message || "Failed to update order status. Please try again.";
    throw new Error(errorMessage);
  }
};
export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateOrderStatus,
    onMutate: async ({ order_id, status }) => {
      console.log("Mutating order status:", order_id, status);
      await queryClient.cancelQueries({ queryKey: ["orders"] });
      const previousOrders = queryClient.getQueryData(["orders"]);
      queryClient.setQueryData(["orders"], (oldOrders) => {
        if (!oldOrders || !Array.isArray(oldOrders)) return oldOrders;
        return oldOrders.map((order) =>
          order.id === order_id ? { ...order, status } : order
        );
      });
      return { previousOrders };
    },
    onError: (error, variables, context) => {
      console.error("Mutation error:", error.message);
      if (context?.previousOrders) {
        queryClient.setQueryData(["orders"], context.previousOrders);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};
