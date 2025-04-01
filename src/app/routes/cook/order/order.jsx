import React, { useState, useEffect } from "react";
import CookNavBAr from "@/components/ui/cooknavbar/cooknavbar";
import { useAllOrders } from "@/modules/cook/orders/api/getAllOrders";
import { OrdersList } from "@/modules/cook/orders/component/orderlist";
import { OrdersHeader } from "@/modules/cook/orders/component/ordersheader";

export const OrderPage = () => {
  const [filterStatus, setFilterStatus] = useState("all");
  const { data: fetchedOrders, isLoading, isError } = useAllOrders();

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (fetchedOrders) {
      setOrders(fetchedOrders);
    }
  }, [fetchedOrders]); 

  if (isLoading) return <div className="text-center p-4">Loading orders...</div>;
  if (isError) return <div className="text-center p-4 text-red-500">Error fetching orders</div>;

  console.log("Current Orders:", orders);

  const statusOptions = ["all", "pending", "accepted", "preparing", "out-for-delivery", "delivered", "cancelled"];

  const filteredOrders = filterStatus === "all" ? orders : orders.filter((order) => order.status === filterStatus);

  const updateOrderStatus = (order_id, newStatus) => {
    console.log(order_id,newStatus)
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === order_id ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <div className="flex h-screen flex-col">
      <CookNavBAr />
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 overflow-auto p-4 md:p-6 bg-gray-50">
          <OrdersHeader filterStatus={filterStatus} setFilterStatus={setFilterStatus} statusOptions={statusOptions} />
          <OrdersList filteredOrders={filteredOrders} updateOrderStatus={updateOrderStatus} />
        </main>
      </div>
    </div>
  );
};
