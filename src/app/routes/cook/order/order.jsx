// src/pages/Cook/Orders/OrderPage.jsx
import CookNavBAr from "@/components/ui/cooknavbar/cooknavbar";
import { OrdersList } from "@/modules/cook/orders/component/orderlist";
import { OrdersHeader } from "@/modules/cook/orders/component/ordersheader";
import { useOrders } from "@/modules/cook/orders/component/useorder";
import React, { useState } from "react";

export const OrderPage = () => {
  const [filterStatus, setFilterStatus] = useState("Ongoing");
  const { orders, updateOrderStatus } = useOrders();

  // Filter orders based on status
  const filteredOrders =
    filterStatus === "All"
      ? orders
      : orders.filter((order) =>
          filterStatus === "Ongoing"
            ? order.status === "Ongoing" || order.status === "Preparing"
            : order.status === filterStatus
        );

  return (
    <div className="flex h-screen flex-col">
      <CookNavBAr />

      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 overflow-auto p-4 md:p-6 bg-gray-50">
          <OrdersHeader
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
          />

          <OrdersList
            filteredOrders={filteredOrders}
            updateOrderStatus={updateOrderStatus}
          />
        </main>
      </div>
    </div>
  );
};
