import React from "react";

export const OrderHeader = ({ order }) => {
  // Format date - if not available, use fallback
  const formatOrderDate = () => {
    if (order?.createdAt) {
      return new Date(order.createdAt).toLocaleString();
    }
    if (order?.timeAccepted) {
      return order.timeAccepted;
    }
    return "Date not available";
  };

  // Status badge color
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

  return (
    <div className="bg-gray-50 px-4 py-3 border-b border-slate-300">
      <div className="flex justify-between items-center">
        <div>
          <span className="text-sm font-medium">
            Order #{order?.order_id || "Unknown"}
          </span>
          <p className="text-xs text-gray-500">{formatOrderDate()}</p>
        </div>
        <span
          className={`px-3 py-1 text-xs rounded-full ${getStatusBadgeStyle(
            order?.status
          )}`}
        >
          {order?.status?.charAt(0).toUpperCase() + order?.status?.slice(1).replace(/-/g, " ")}
        </span>
      </div>
    </div>
  );
};