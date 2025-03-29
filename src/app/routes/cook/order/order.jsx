import CookNavBAr from "@/components/ui/cooknavbar/cooknavbar";
import { OrdersList } from "@/modules/cook/orders/component/orderlist";
import { OrdersHeader } from "@/modules/cook/orders/component/ordersheader";
import React, { useState } from "react";
import { useAllOrders } from "@/modules/cook/orders/api/getAllOrders";

export const OrderPage = () => {
  const [filterStatus, setFilterStatus] = useState("pending");

  const { data: currentOrders, isLoading, isError } = useAllOrders();

  if (isLoading) {
    return <div className="text-center p-4">Loading orders...</div>;
  }

  if (isError) {
    return <div className="text-center p-4 text-red-500">Error fetching orders</div>;
  }

  console.log("Current Orders:", currentOrders);

  const statusOptions = ["all", "pending", "accepted", "preparing", "out-for-delivery", "delivered", "cancelled"];

  const filteredOrders =
    filterStatus === "all"
      ? currentOrders
      : currentOrders.filter((order) => order.status === filterStatus);

  return (
    <div className="flex h-screen flex-col">
      <CookNavBAr />

      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 overflow-auto p-4 md:p-6 bg-gray-50">
          <OrdersHeader filterStatus={filterStatus} setFilterStatus={setFilterStatus} statusOptions={statusOptions} />

          {/* Orders List */}
          <OrdersList filteredOrders={filteredOrders} />
        </main>
      </div>
    </div>
  );
};
