import React from "react";
import { useUpdateOrderStatus } from "../api/updateOrders";

export const OrderActions = ({ order }) => {
  const { mutate: updateStatus, isLoading } = useUpdateOrderStatus();

  const handleUpdateStatus = (newStatus) => {
    updateStatus({ order_id: order.order_id, status: newStatus });
  };

  // Define possible status transitions
  const statusActions = {
    pending: [
      { label: "Start Preparing", status: "preparing", color: "bg-yellow-500 hover:bg-yellow-600" },
      { label: "Cancel Order", status: "cancelled", color: "bg-red-500 hover:bg-red-600" },
    ],
    preparing: [
      { label: "Out for Delivery", status: "out-for-delivery", color: "bg-blue-500 hover:bg-blue-600" },
    ],
    "out-for-delivery": [
      { label: "Mark as Delivered", status: "delivered", color: "bg-green-500 hover:bg-green-600" },
    ],
  };

  return (
    <div className="mt-4 pt-4 border-t flex flex-wrap gap-2">
      {/* Render action buttons based on the current order status */}
      {statusActions[order.status]?.map((action) => (
        <button
          key={action.status}
          onClick={() => handleUpdateStatus(action.status)}
          className={`rounded-md px-4 py-2 text-white ${action.color}`}
          disabled={isLoading}
        >
          {action.label}
        </button>
      ))}

      {/* Status messages */}
      {order.status === "delivered" && (
        <span className="text-green-600 font-medium">Order completed successfully!</span>
      )}
      {order.status === "cancelled" && (
        <span className="text-red-600 font-medium">Order has been cancelled</span>
      )}
    </div>
  );
};
