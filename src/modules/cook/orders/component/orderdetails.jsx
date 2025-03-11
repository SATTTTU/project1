// src/components/Orders/OrderDetails.jsx
import React from "react";

export const OrderDetails = ({ order }) => {
  return (
    <div className="flex flex-col md:flex-row md:justify-between">
      <div className="mb-4 md:mb-0">
        <h3 className="font-medium">{order.customerName}</h3>
        <p className="text-sm text-gray-500">{order.address}</p>

        {(order.status === "Ongoing" || order.status === "Preparing") && (
          <div className="mt-2 flex items-center text-sm">
            <svg
              className="mr-1 h-4 w-4 text-[#426B1F]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>
              Time remaining:{" "}
              <span className="font-medium">{order.timeRemaining}</span>
            </span>
          </div>
        )}
      </div>

      <div className="text-right">
        <p className="text-lg font-bold">₹{order.total}</p>
        <p className="text-xs text-gray-500">{order.items.length} items</p>
      </div>
    </div>
  );
};
