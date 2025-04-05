import React from "react";
import { useUpdateOrderStatus } from "../api/updateOrders";
import { useNavigate } from "react-router-dom";

export const OrderStatusUpdate = ({ order, updateOrderStatus }) => {
  const { mutate: updateStatus, isLoading } = useUpdateOrderStatus();
  const navigate = useNavigate();

  // Define valid status progression (only 4 statuses)
  const statusFlow = {
    pending: ["accepted"],
    accepted: ["preparing"],
    preparing: ["out-for-delivery"],
    "out-for-delivery": [] // Terminal state in our simplified flow
  };

  // Get valid status options based on current status
  const getStatusOptions = () => {
    const allStatuses = [
      { value: "pending", label: "Pending" },
      { value: "accepted", label: "Accepted" },
      { value: "preparing", label: "Preparing" },
      { value: "out-for-delivery", label: "Out for Delivery" }
    ];
    
    // For terminal state, only show current status
    if (order.status === "out-for-delivery") {
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
      // First update local state
      updateOrderStatus(order.order_id, newStatus);
      
      // Then call API
      updateStatus({ 
        order_id: order.order_id, 
        status: newStatus 
      }, {
        onSuccess: () => {
          // Navigate to tracking page if status is changed to out-for-delivery
          if (newStatus === "out-for-delivery") {
            navigateToTracking();
          }
        }
      });
    } else {
      alert(`Cannot change status from ${order.status} to ${newStatus}. Invalid transition.`);
    }
  };

  const navigateToTracking = () => {
    if (order && order.order_id) {
      const orderId = order.order_id.toString();
      navigate(`/cook/order-tracking/${orderId}`);
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
        disabled={isLoading || order.status === "out-for-delivery"}
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
      {order.status === "out-for-delivery" && (
        <p className="text-xs text-gray-500 mt-1">
          This order has reached its final delivery status.
        </p>
      )}
    </div>
  );
};