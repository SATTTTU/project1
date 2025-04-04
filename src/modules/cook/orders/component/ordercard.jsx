import React from "react";
import { OrderHeader } from "./orderheader";
import { OrderDetails } from "./orderdetails";
import { OrderItems } from "./orderitems";
import { OrderStatusUpdate } from "./orderactions";

export const OrderCard = ({ order, updateOrderStatus }) => {
  return (
    <div className="rounded-lg border border-slate-300 bg-white shadow-sm overflow-hidden">
      <OrderHeader order={order} />
      <div className="p-4 space-y-4">
        <OrderDetails order={order} />
        <OrderItems items={order.items} />
        <OrderStatusUpdate order={order} updateOrderStatus={updateOrderStatus} />
      </div>
    </div>
  );
};
