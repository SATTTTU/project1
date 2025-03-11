// src/components/Orders/OrderActions.jsx
import React from "react";

export const OrderActions = ({ order, updateOrderStatus }) => {
  return (
    <div className="mt-4 pt-4 border-t flex flex-wrap gap-2">
      {order.status === "Ongoing" && (
        <>
          <button
            onClick={() => updateOrderStatus(order.id, "Preparing")}
            className="rounded-md bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600"
          >
            Start Preparing
          </button>
          <button
            onClick={() => updateOrderStatus(order.id, "Cancelled")}
            className="rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          >
            Cancel Order
          </button>
        </>
      )}

      {order.status === "Preparing" && (
        <button
          onClick={() => updateOrderStatus(order.id, "Ready")}
          className="rounded-md bg-purple-500 px-4 py-2 text-white hover:bg-purple-600"
        >
          Mark as Ready
        </button>
      )}

      {order.status === "Ready" && (
        <button
          onClick={() => updateOrderStatus(order.id, "Completed")}
          className="rounded-md bg-[#426B1F] px-4 py-2 text-white hover:bg-[#365818]"
        >
          Complete Order
        </button>
      )}

      {order.status === "Completed" && (
        <span className="text-green-600 font-medium">
          Order completed successfully!
        </span>
      )}

      {order.status === "Cancelled" && (
        <span className="text-red-600 font-medium">
          Order has been cancelled
        </span>
      )}
    </div>
  );
};
