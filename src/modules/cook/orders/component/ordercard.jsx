// src/components/Orders/OrderCard.jsx
import React from "react";
import { OrderHeader } from "./OrderHeader";
import { OrderDetails } from "./OrderDetails";
import { OrderItems } from "./OrderItems";
import { OrderActions } from "./OrderActions";

export const OrderCard = ({ order, updateOrderStatus }) => {
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
