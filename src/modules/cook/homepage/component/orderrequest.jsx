import React, { useState } from "react";

const OrderRequestCard = ({ order, updateOrderStatus }) => {
  const [status, setStatus] = useState(order.status);
  console.log("orders*****", order)

  const handleStatusChange = (event) => {
    const newStatus = event.target.value;
    setStatus(newStatus);
    updateOrderStatus(order.id, newStatus); // Call the function passed as a prop to update status
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold">{order.customerName}</h3>
        <span className="text-sm text-gray-500">{order.time}</span>
      </div>
      <div className="mt-2">
        <p className="text-gray-700">{order.items}</p>
        <p className="text-gray-500">Payment: {order.paymentMethod}</p>
        <p className="text-xl font-bold mt-2">Total: ${order.total.toFixed(2)}</p>
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
