import React from "react";

export const OrderDetails = ({ order }) => {
  if (!order) return <p>No order details available</p>;

  const { user, address, status, timeRemaining, items = [] } = order;

  // Calculate total price of all items
  const totalPrice = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className="flex flex-col md:flex-row md:justify-between p-4 border-b">
      {/* User & Address Section */}
      <div className="mb-4 md:mb-0">
        <h3 className="font-medium">{user?.name || "Unknown User"}</h3>
        <p className="text-sm text-gray-500">{address || "No address provided"}</p>

        {/* Time Remaining Indicator for Ongoing or Preparing Orders */}
        {(status === "Ongoing" || status === "Preparing") && timeRemaining && (
          <div className="mt-2 flex items-center text-sm text-[#426B1F]">
            <svg
              className="mr-1 h-4 w-4"
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
              Time remaining: <span className="font-medium">{timeRemaining}</span>
            </span>
          </div>
        )}
      </div>

      {/* Order Summary Section */}
      <div className="text-right">
        <p className="text-lg font-bold">₹{totalPrice.toFixed(2)}</p>
        <p className="text-xs text-gray-500">{items.length} item{items.length !== 1 ? "s" : ""}</p>
      </div>
    </div>
  );
};
