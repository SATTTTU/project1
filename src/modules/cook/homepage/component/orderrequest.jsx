import React from "react";

const OrderRequest = ({ order }) => {
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
            <span className="text-sm text-gray-500">{order.time}</span>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-1">
            <p className="text-sm text-gray-600">
              <span className="font-medium">Items:</span>{" "}
              {order.items.join(", ")}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Distance:</span> {order.distance}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Payment:</span>{" "}
              {order.paymentMethod}
            </p>
            <p className="text-sm font-medium text-[#426B1F]">
              Total: ₹{order.total}
            </p>
          </div>
          <div className="mt-3 flex gap-2">
            <button className="flex items-center cursor-pointer rounded-md bg-[#426B1F] px-3 py-1.5 text-sm font-medium text-white hover:bg-[#365818]">
              Accept Order
            </button>
            <button className="flex items-center cursor-pointer rounded-md bg-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-300">
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderRequest;
