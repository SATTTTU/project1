import React from "react";
import { OrderStatusBadge } from "./orderstatusbadge";

export const OrderHeader = ({ order }) => {
  return (
    <div className="flex justify-between items-center border-b bg-gray-50 px-4 py-3">
      <div className="flex items-center justify-between space-x-4">
        <p className="font-medium text-lg">OrderId: {order.order_id}</p>
        <OrderStatusBadge status={order.status} className="bg-green-100" />
      </div>
      <div className="text-sm text-gray-500">{order.date}</div>
    </div>
  );
};
