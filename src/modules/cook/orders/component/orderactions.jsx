import React from "react";
import { useUpdateOrderStatus } from "../api/updateOrders";
import { useNavigate } from "react-router-dom";

export const OrderStatusUpdate = ({ order, updateOrderStatus }) => {
  const { mutate: updateStatus, isLoading } = useUpdateOrderStatus();
  const navigate = useNavigate();

  // Define valid status progression
  const statusFlow = {
    pending: ["accepted", "cancelled"],
    accepted: ["preparing", "cancelled"],
    preparing: ["out-for-delivery", "cancelled"],
    "out-for-delivery": ["delivered", "cancelled"],
    delivered: [], // Terminal state
    cancelled: [], // Terminal state
  };

  // Get valid status options based on current status
  const getStatusOptions = () => {
    const allStatuses = [
      { value: "pending", label: "Pending" },
      { value: "accepted", label: "Accepted" },
      { value: "preparing", label: "Preparing" },
      { value: "out-for-delivery", label: "Out for Delivery" },
      { value: "delivered", label: "Delivered" },
      { value: "cancelled", label: "Cancelled" }
    ];
    
    // For terminal states, only show current status
    if (order.status === "delivered" || order.status === "cancelled") {
      return allStatuses.filter(s => s.value === order.status);
    }
    
    // For active states, show current + valid next states
    return allStatuses.filter(s => 
      s.value === order.status || statusFlow[order.status]?.includes(s.value)
    );
  };

  const handleStatusChange = (event) => {
    const newStatus = event.target.value;
    
    // Check if status transition is valid
    if (
      newStatus === order.status || 
      statusFlow[order.status]?.includes(newStatus)
    ) {
      updateOrderStatus(order.order_id, newStatus);
      updateStatus({ order_id: order.order_id, status: newStatus });
      
      // Navigate to tracking page if status is changed to out-for-delivery
      if (newStatus === "out-for-delivery") {
        if (order && order.order_id) {
          const orderId = order.order_id.toString();
          navigate(`/cook/order-tracking/${orderId}`);
        }
      }
    } else {
      alert(`Cannot change status from ${order.status} to ${newStatus}. Invalid transition.`);
    }
  };

  return (
    <div className="flex-1">
      <label htmlFor={`status-${order.order_id}`} className="text-sm text-gray-600 block mb-1">
        Update Status
      </label>
      <select
        id={`status-${order.order_id}`}
        value={order.status}
        onChange={handleStatusChange}
        disabled={isLoading || order.status === "delivered" || order.status === "cancelled"}
        className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {getStatusOptions().map((status) => (
          <option key={status.value} value={status.value}>
            {status.label}
          </option>
        ))}
      </select>
      {isLoading && (
        <p className="text-xs text-gray-500 mt-1">Updating status...</p>
      )}
      {(order.status === "delivered" || order.status === "cancelled") && (
        <p className="text-xs text-gray-500 mt-1">
          This order has reached its final status and cannot be modified.
        </p>
      )}
    </div>
  );
};