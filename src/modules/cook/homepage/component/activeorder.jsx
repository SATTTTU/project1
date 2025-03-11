import React from "react";

const ActiveOrder = ({ order }) => {
  return (
    <div className="rounded-lg bg-white p-4 shadow-md hover:shadow-lg transition-all">
      <div className="flex items-start">
        <img
          src={order.image}
          alt="Customer"
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
            <span className="font-medium">Items:</span> {order.items.join(", ")}
          </p>
          <div className="grid grid-cols-2 gap-1 mt-1">
            <p className="text-sm text-gray-600">
              <span className="font-medium">Accepted:</span>{" "}
              {order.timeAccepted}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Delivery in:</span>{" "}
              {order.estimatedDelivery}
            </p>
            <p className="text-sm font-medium text-[#426B1F]">
              Total: ₹{order.total}
            </p>
          </div>
          <div className="mt-3 flex gap-2">
            {order.status === "preparing" ? (
              <button className="flex items-center cursor-pointer rounded-md bg-green-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-green-700">
                Mark as Ready
              </button>
            ) : (
              <button className="flex items-center cursor-pointer rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700">
                Handed to Delivery
              </button>
            )}
            <button className="flex items-center cursor-pointer rounded-md bg-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-300">
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveOrder;
