import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const OrderRequestCard = ({ order, updateOrderStatus }) => {
  const [status, setStatus] = useState(order.status);
  const navigate = useNavigate();

  // Define the valid status progression
  const statusFlow = {
    pending: ["accepted", "cancelled"],
    accepted: ["preparing", "cancelled"],
    preparing: ["out-for-delivery", "cancelled"],
    "out-for-delivery": ["delivered", "cancelled"],
    delivered: [], // Terminal state - no further transitions
    cancelled: [], // Terminal state - no further transitions
  };

  const handleStatusChange = (event) => {
    const newStatus = event.target.value;
    
    // Check if the status transition is valid
    if (statusFlow[status].includes(newStatus) || newStatus === status) {
      setStatus(newStatus);
      updateOrderStatus(order.order_id, newStatus);
      
      // Navigate to order tracking page when status changes to out-for-delivery
      if (newStatus === "out-for-delivery") {
        handleTrackOrder();
      }
    } else {
      alert(`Cannot change status from ${status} to ${newStatus}. Invalid transition.`);
    }
  };

  const handleTrackOrder = () => {
    if (order && order.order_id) {
      const orderId = order.order_id.toString();
      navigate(`/cook/order-tracking/${orderId}`);
    } else {
      console.error("Cannot track order - missing order ID", order);
    }
  };

  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "accepted":
        return "bg-blue-100 text-blue-800";
      case "preparing":
        return "bg-orange-100 text-orange-800";
      case "out-for-delivery":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Get next logical action based on current status
  const getNextAction = (currentStatus) => {
    switch (currentStatus) {
      case "pending":
        return { status: "accepted", text: "Accept Order", style: "bg-blue-600 hover:bg-blue-700" };
      case "accepted":
        return { status: "preparing", text: "Start Preparing", style: "bg-orange-600 hover:bg-orange-700" };
      case "preparing":
        return { status: "out-for-delivery", text: "Mark as Ready", style: "bg-green-600 hover:bg-green-700" };
      case "out-for-delivery":
        return { status: "delivered", text: "Deliver Order", style: "bg-purple-600 hover:bg-purple-700" };
      case "delivered":
        return { status: "delivered", text: "Order Completed", style: "bg-gray-600 hover:bg-gray-700", disabled: true };
      case "cancelled":
        return { status: "cancelled", text: "Order Cancelled", style: "bg-red-600 hover:bg-red-700", disabled: true };
      default:
        return { status: "", text: "Update Status", style: "bg-blue-600 hover:bg-blue-700" };
    }
  };

  const nextAction = getNextAction(status);

  const handleActionButton = () => {
    // If terminal state or disabled, do nothing
    if (nextAction.disabled) return;
    
    // For tracking, just navigate
    if (status === "out-for-delivery" && nextAction.text === "Track Order") {
      handleTrackOrder();
      return;
    }
    
    // Otherwise proceed with next status
    if (nextAction.status && statusFlow[status].includes(nextAction.status)) {
      setStatus(nextAction.status);
      updateOrderStatus(order.order_id, nextAction.status);
      
      if (nextAction.status === "out-for-delivery") {
        handleTrackOrder();
      }
    }
  };

  // Generate valid status options based on current status
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
    if (status === "delivered" || status === "cancelled") {
      return allStatuses.filter(s => s.value === status);
    }
    
    // For active states, show current + valid next states
    return allStatuses.filter(s => 
      s.value === status || statusFlow[status].includes(s.value)
    );
  };

  return (
    <div className="rounded-lg bg-white p-4 shadow-md hover:shadow-lg transition-all">
      <div className="flex items-start">
        <img
          src={order.image || "/placeholder.svg"}
          alt="Customer"
          className="h-20 w-20 rounded-md object-cover mr-4"
        />
        <div className="flex-1">
          <div className="flex justify-between">
            <h3 className="font-semibold">{order.customerName || order.user?.name || "Customer"}</h3>
            <span
              className={`px-3 py-1 text-xs rounded-full ${getStatusBadgeStyle(status)}`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1).replace(/-/g, ' ')}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-1 mt-1">
            <p className="text-sm text-gray-600">
              <span className="font-medium">Accepted:</span> {order.timeAccepted || "Pending"}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Delivery in:</span> {order.estimatedDelivery || order.timeRemaining || "N/A"}
            </p>
            <p className="text-sm font-medium text-[#426B1F]">
              Total: ₹{parseFloat(order.total || (order.items?.reduce((acc, item) => acc + item.price * item.quantity, 0) || 0)).toFixed(2)}
            </p>
          </div>

          <div className="mt-3 flex gap-2">
            <button
              onClick={handleActionButton}
              className={`flex items-center cursor-pointer rounded-md ${nextAction.style} px-3 py-1.5 text-sm font-medium text-white`}
              disabled={nextAction.disabled}
            >
              {nextAction.text}
            </button>
            {status !== "cancelled" && status !== "delivered" && (
              <button
                onClick={() => {
                  if (confirm("Are you sure you want to cancel this order?")) {
                    setStatus("cancelled");
                    updateOrderStatus(order.order_id, "cancelled");
                  }
                }}
                className="flex items-center cursor-pointer rounded-md bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-700"
              >
                Cancel Order
              </button>
            )}
            {(status === "out-for-delivery" || status === "preparing") && (
              <button
                onClick={handleTrackOrder}
                className="flex items-center cursor-pointer rounded-md bg-gray-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-gray-700"
              >
                Track Order
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-sm text-gray-600 mb-1">Order Status</label>
        <select
          value={status}
          onChange={handleStatusChange}
          className="w-full p-2 border border-gray-300 rounded-md"
          disabled={status === "delivered" || status === "cancelled"}
        >
          {getStatusOptions().map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {(status === "delivered" || status === "cancelled") && (
          <p className="text-xs text-gray-500 mt-1">
            This order has reached its final status and cannot be modified.
          </p>
        )}
      </div>
    </div>
  );
};