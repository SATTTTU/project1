import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUpdateOrderStatus } from "../../orders/api/updateOrders";
import Dishes from "../../../../assets/defaultDishes.jpg";


export const OrderRequestCard = ({ order, updateOrderStatus }) => {
	console.log("orders****aayyo", order);
	const [status, setStatus] = useState(order.status);
	const navigate = useNavigate();
  const { mutate: updateStatus, isLoading } = useUpdateOrderStatus();

  // Define the valid status progression (only 4 statuses)
  const statusFlow = {
    pending: ["accepted"],
    accepted: ["preparing"],
    preparing: ["out-for-delivery"],
    "out-for-delivery": [] // Terminal state in our simplified flow
  };

  const handleStatusChange = (event) => {
    const newStatus = event.target.value;
    
    // Check if the status transition is valid
    if (statusFlow[status]?.includes(newStatus) || newStatus === status) {
      // Update local state
      setStatus(newStatus);
      updateOrderStatus(order.order_id, newStatus);
      
      // Call API
      updateStatus(
        { order_id: order.order_id, status: newStatus },
        {
          onSuccess: () => {
            // Navigate to order tracking page when status changes to out-for-delivery
            if (newStatus === "out-for-delivery") {
              handleTrackOrder();
            }
          }
        }
      );
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
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
	const imageBaseUrl = "https://khajabox-bucket.s3.ap-south-1.amazonaws.com/";

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
        return { status: "out-for-delivery", text: "Track Order", style: "bg-gray-600 hover:bg-gray-700" };
      default:
        return { status: "", text: "Update Status", style: "bg-blue-600 hover:bg-blue-700" };
    }
  };

  const nextAction = getNextAction(status);

  const handleActionButton = () => {
    // For tracking or out-for-delivery, just navigate
    if (status === "out-for-delivery" || nextAction.text === "Track Order") {
      handleTrackOrder();
      return;
    }
    
    // Otherwise proceed with next status
    if (nextAction.status && statusFlow[status]?.includes(nextAction.status)) {
      // Update local state
      setStatus(nextAction.status);
      updateOrderStatus(order.order_id, nextAction.status);
      
      // Call API
      updateStatus(
        { order_id: order.order_id, status: nextAction.status },
        {
          onSuccess: () => {
            if (nextAction.status === "out-for-delivery") {
              handleTrackOrder();
            }
          }
        }
      );
    }
  };

  // Generate valid status options based on current status
  const getStatusOptions = () => {
    const allStatuses = [
      { value: "pending", label: "Pending" },
      { value: "accepted", label: "Accepted" },
      { value: "preparing", label: "Preparing" },
      { value: "out-for-delivery", label: "Out for Delivery" }
    ];
    
    // For terminal state, only show current status
    if (status === "out-for-delivery") {
      return allStatuses.filter(s => s.value === status);
    }
    
    // For active states, show current + valid next states
    return allStatuses.filter(s => 
      s.value === status || statusFlow[status]?.includes(s.value)
    );
  };

	return (
		<div className="rounded-lg bg-white p-4 shadow-md hover:shadow-lg transition-all">
			<div className="flex items-start">
				<img
					src={order?.image_url ? `${imageBaseUrl}${order?.items[0].menuitem.image_url}` : Dishes}
					alt="Profile"
					className="h-34 mr-2 w-24 object-cover shadow-md border-2 border-white transition-all duration-300"
				/>
				<div className="flex-1">
					<div className="flex justify-between">
						<h3 className="font-semibold">{order.customerName}</h3>
						<span
							className={`px-3 py-1 text-xs rounded-full ${
								order.status === "preparing"
									? "bg-yellow-100 text-yellow-800"
									: "bg-green-100 text-green-800"
							}`}
						>
							{order.status === "preparing" ? "Preparing" : "Ready for Pickup"}
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
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : nextAction.text}
            </button>
            {status === "out-for-delivery" && (
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
          disabled={isLoading || status === "out-for-delivery"}
        >
          {getStatusOptions().map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {isLoading && (
          <p className="text-xs text-gray-500 mt-1">
            Updating status...
          </p>
        )}
        {status === "out-for-delivery" && (
          <p className="text-xs text-gray-500 mt-1">
            This order is out for delivery.
          </p>
        )}
      </div>
    </div>
  );
};