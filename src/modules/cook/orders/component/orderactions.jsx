
import React, { useState } from "react";
import { useUpdateOrderStatus } from "../api/updateOrders";

export const OrderActions = ({ order }) => {
  const { mutate: updateStatus, isLoading } = useUpdateOrderStatus();
  const [newStatus, setNewStatus] = useState(order.status);

  const handleUpdateStatus = (e) => {
    const status = e.target.value;
    setNewStatus(status);
    updateStatus({ order_id: order.order_id, status });
  };

  // Define possible status transitions
  const statusActions = {
    pending: [
      { label: "Accept Order", status: "accepted" },
      { label: "Cancel Order", status: "cancelled" },
    ],
    accepted: [
      { label: "Start Preparing", status: "preparing" },
    ],
    preparing: [
      { label: "Out for Delivery", status: "out-for-delivery" },
    ],
    "out-for-delivery": [
      { label: "Mark as Delivered", status: "delivered" },
    ],
  };

  return (
    <div className="mt-4 pt-4 border-t flex flex-wrap gap-2">
      <select
        value={newStatus}
        onChange={handleUpdateStatus}
        disabled={isLoading}
        className="rounded-md px-4 py-2"
      >
        {statusActions[order.status]?.map((action) => (
          <option key={action.status} value={action.status}>
            {action.label}
          </option>
        ))}
      </select>

      {order.status === "delivered" && (
        <span className="text-green-600 font-medium">Order completed successfully!</span>
      )}
      {order.status === "cancelled" && (
        <span className="text-red-600 font-medium">Order has been cancelled</span>
      )}
    </div>
  );
};npm 