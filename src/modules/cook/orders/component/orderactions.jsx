import React from "react";
import { useUpdateOrderStatus } from "../api/updateOrders";

const statuses = [
  "pending",
  "accepted",
  "preparing",
  "out-for-delivery",
  "delivered",
  "cancelled",
];

export const OrderStatusUpdate = ({ order, updateOrderStatus }) => {
  const { mutate: updateStatus, isLoading } = useUpdateOrderStatus();

  const handleStatusChange = (event) => {
    const newStatus = event.target.value;

    updateOrderStatus(order.order_id, newStatus);

    updateStatus({ order_id: order.order_id, status: newStatus });
  };

  return (
    <div className="mt-4">
      <select
        value={order.status}
        onChange={handleStatusChange}
        disabled={isLoading}
        className="px-4 py-2 text-sm font-semibold border border-gray-300 rounded-md w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {statuses.map((status) => (
          <option key={status} value={status.toLowerCase()}>
            {status}
          </option>
        ))}
      </select>
    </div>
  );
};
