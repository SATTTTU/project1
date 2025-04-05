import React, { useState, useEffect } from "react";
import CookNavBAr from "@/components/ui/cooknavbar/cooknavbar";
import { useAllOrders } from "@/modules/cook/orders/api/getAllOrders";
import { OrdersList } from "@/modules/cook/orders/component/orderlist";
import { OrderHeader } from "@/modules/cook/orders/component/orderheader";

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

  const statusOptions = ["all", "pending", "accepted", "preparing", "out-for-delivery", "delivered", "cancelled"];

  const filteredOrders = filterStatus === "all" 
    ? orders 
    : orders.filter((order) => order.status === filterStatus);

  const updateOrderStatus = (order_id, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.order_id === order_id ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <div className="flex h-screen flex-col">
      <CookNavBAr />
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 overflow-auto p-4 md:p-6 bg-gray-50">
          {/* Page header instead of order-specific header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Orders Management</h1>
            <div className="flex items-center mt-4 space-x-4">
              <span className="text-sm text-gray-600">
                Showing {filteredOrders.length} {filterStatus === "all" ? "" : filterStatus} orders
              </span>
              <select 
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-1 border rounded-md text-sm"
              >
                {statusOptions.map((option) => (
                  <option key={option} value={option}>
                    {option.charAt(0).toUpperCase() + option.slice(1).replace(/-/g, " ")}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <OrdersList 
            filteredOrders={filteredOrders} 
            updateOrderStatus={updateOrderStatus} 
          />
        </main>
      </div>
    </div>
  );
};