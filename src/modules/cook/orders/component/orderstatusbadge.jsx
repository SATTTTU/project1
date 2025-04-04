// src/components/Orders/OrderStatusBadge.jsx
import React from "react";

export const OrderStatusBadge = ({ status }) => {
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "pending":
        return "bg-blue-100 text-blue-800";
      case "Preparing":
        return "bg-yellow-100 text-yellow-800";
        case "accepted":
          return "bg-orange-100 text-yellow-800";
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      case "Ready":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <span
      className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${getStatusBadgeClass(
        status
      )}`}
    >
      {status}
    </span>
  );
};
