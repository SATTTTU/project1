// src/components/Orders/OrderCard.jsx
import React from "react";
import { OrderHeader } from "./orderheader";
import { OrderDetails } from "./orderdetails";
import { OrderItems } from "./orderitems";
import { OrderActions } from "./orderactions";

export const OrderCard = ({ order, updateOrderStatus }) => {
  console.log("All orders", order)
  return (
    <div className="rounded-lg border bg-white shadow-sm overflow-hidden">
      <OrderHeader order={order} />

      <div className="p-4">
        <OrderDetails order={order} />
        <OrderItems items={order.items} />
        <OrderActions order={order} updateOrderStatus={updateOrderStatus} />
      </div>
    </div>
  );
};
