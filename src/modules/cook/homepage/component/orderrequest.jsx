import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const OrderRequestCard = ({ order, updateOrderStatus }) => {
  const [status, setStatus] = useState(order.status);
  console.log("orders*****", order)

  const handleStatusChange = (event) => {
    const newStatus = event.target.value;
    setStatus(newStatus);
    updateOrderStatus(order.id, newStatus); // Call the function passed as a prop to update status
  };
  const navigate = useNavigate();
  
  const handleTrackOrder = () => {
    // Updated to use order.id instead of order.order_id
    if (order && order.id) {
      navigate(`/cook/order-tracking/${order.id}`);
    } else {
      console.error("Cannot track order - missing order ID", order);
    }
  };

  return (
    <div className="rounded-lg bg-white p-4 shadow-md hover:shadow-lg transition-all">
      <div className="flex items-start">
        <img
          src={order.image || "/placeholder.svg"}
          alt={order.items[0] || "Customer"}
          className="h-20 w-20 rounded-md object-cover mr-4"
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
          <p className="text-sm text-gray-600 mt-1">
            <span className="font-medium">Items:</span> {items}
          </p>
          <div className="grid grid-cols-2 gap-1 mt-1">
            <p className="text-sm text-gray-600">
              <span className="font-medium">Accepted:</span> {order.timeAccepted}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Delivery in:</span> {order.estimatedDelivery}
            </p>
            <p className="text-sm font-medium text-[#426B1F]">
              Total: ₹{order.total?.toFixed(2)}
            </p>
          </div>
          <div className="mt-3 flex gap-2">
            {order.status === "preparing" ? (
              <button className="flex items-center cursor-pointer rounded-md bg-green-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-green-700">
                Mark as Ready
              </button>
            ) : (
              <button className="flex items-center cursor-pointer rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700">
                Start Preparing
              </button>
            )}
            <button 
              onClick={handleTrackOrder}
              className="flex items-center cursor-pointer rounded-md bg-gray-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-gray-700"
            >
              Track Order
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <select
          value={status}
          onChange={handleStatusChange}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="pending">Pending</option>
          <option value="accepted">Accepted</option>
          <option value="preparing">Preparing</option>
          <option value="out-for-delivery">Out for Delivery</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
    </div>
  );
};

export default OrderRequestCard;