// src/components/Orders/OrdersList.jsx
import React from "react";
import { OrderCard } from "./OrderCard";

export const OrdersList = ({ filteredOrders, updateOrderStatus }) => {
  return (
    <div className="space-y-4">
      {filteredOrders.length === 0 ? (
        <div className="rounded-lg border bg-white p-8 text-center shadow-sm">
          <p className="text-gray-500">No orders found</p>
        </div>
      ) : (
        filteredOrders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            updateOrderStatus={updateOrderStatus}
          />
        ))
      )}
    </div>
  );
};
