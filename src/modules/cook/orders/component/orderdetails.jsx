import React from "react";

export const OrderDetails = ({ order }) => {
  if (!order) return <p>No order details available</p>;

  const { user, address, status, timeRemaining, items = [], total } = order;

  // Calculate total price from items if total is not provided
  const calculateTotal = () => {
    if (total) return parseFloat(total).toFixed(2);
    return items.reduce((acc, item) => acc + (item.price || 0) * item.quantity, 0).toFixed(2);
  };

  // Format status for display
  const formatStatus = (status) => {
    if (!status) return "Unknown";
    return status.charAt(0).toUpperCase() + status.slice(1).replace(/-/g, ' ');
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "pending": return "text-yellow-600";
      case "accepted": return "text-blue-600";
      case "preparing": return "text-orange-600";
      case "out-for-delivery": return "text-purple-600";
      case "delivered": return "text-green-600";
      case "cancelled": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b border-slate-300 pb-4">
      <div>
        <h3 className="font-medium text-lg">{user?.name || order.customerName || "Unknown User"}</h3>
        <p className="text-sm text-gray-500">{address || "No address provided"}</p>
        
        <div className="mt-3">
          <span className={`inline-block px-2 py-1 text-xs rounded-md ${getStatusColor(status)} bg-opacity-10 bg-current`}>
            Status: {formatStatus(status)}
          </span>
        </div>
        
        {(status === "preparing" || status === "accepted" || status === "out-for-delivery") && 
          (timeRemaining || order.estimatedDelivery) && (
          <div className="mt-2 flex items-center text-sm text-[#426B1F]">
            <svg className="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>
              Time remaining: <span className="font-medium">{timeRemaining || order.estimatedDelivery}</span>
            </span>
          </div>
        )}
        
        {order.timeAccepted && (
          <p className="text-xs text-gray-500 mt-1">
            Accepted at: {order.timeAccepted}
          </p>
        )}
      </div>

      <div className="text-right">
        <p className="text-xl font-bold">₹{calculateTotal()}</p>
        <p className="text-xs text-gray-500">{items.length} item{items.length !== 1 ? "s" : ""}</p>
        
        {order.order_id && (
          <p className="text-xs text-gray-500 mt-1">
            Order ID: #{order.order_id}
          </p>
        )}
      </div>
    </div>
  );
};