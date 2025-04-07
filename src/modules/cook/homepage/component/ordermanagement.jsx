import React, { useState, useEffect } from "react";
import { useGetUserOrder } from "../api/getUserOrder";
import { OrderRequestCard } from "./orderrequest";
import { OrderCard } from "../../orders/component/ordercard";

const OrderManagement = () => {
  const [filterStatus, setFilterStatus] = useState("all");
  const { data: fetchedOrders, isLoading, isError } = useGetUserOrder();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (fetchedOrders) {
      setOrders(fetchedOrders);
    }
  }, [fetchedOrders]);

  if (isLoading)
    return <div className="text-center p-4">Loading orders...</div>;
  if (isError)
    return (
      <div className="text-center p-4 text-red-500">Error fetching orders</div>
    );

  const updateOrderStatus = (order_id, newStatus) => {
    console.log(`Updating order ${order_id} to status: ${newStatus}`);
    
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.order_id === order_id ? { ...order, status: newStatus } : order
      )
    );
  };

  // Filter tabs for better status filtering
  const statusFilters = [
    { label: "All", value: "all" },
    { label: "Pending", value: "pending" },
    { label: "Accepted", value: "accepted" },
    { label: "Preparing", value: "preparing" },
    { label: "Out for Delivery", value: "out-for-delivery" },
    
  ];

  // Filter orders based on selected status
  const filteredOrders =
    filterStatus === "all"
      ? orders
      : orders.filter((order) => order.status === filterStatus);

  // Group orders by active vs completed
  const activeStatuses = ["pending", "accepted", "preparing", "out-for-delivery"];
  const completedStatuses = ["delivered", "cancelled"];
  
  const activeOrders = filteredOrders.filter(order => 
    activeStatuses.includes(order.status)
  );
  
  const completedOrders = filteredOrders.filter(order => 
    completedStatuses.includes(order.status)
  );

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="mb-4 text-xl font-bold">Order Management</h2>
      
      {/* Status filter tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {statusFilters.map((filter) => (
          <button
            key={filter.value}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              filterStatus === filter.value
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
            onClick={() => setFilterStatus(filter.value)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Active Orders Section */}
      {activeOrders.length > 0 && (
        <>
          <h3 className="text-lg font-semibold mb-3">Active Orders</h3>
          <div className="grid gap-4 mb-8">
            {activeOrders.map((order) => (
              <OrderRequestCard
                key={order.order_id}
                order={order}
                updateOrderStatus={updateOrderStatus}
              />
            ))}
          </div>
        </>
      )}

      {/* Completed Orders Section */}
      {completedOrders.length > 0 && (
        <>
          <h3 className="text-lg font-semibold mb-3">Completed Orders</h3>
          <div className="grid gap-4 mb-8">
            {completedOrders.map((order) => (
              <OrderCard
                key={order.order_id}
                order={order}
                updateOrderStatus={updateOrderStatus}
              />
            ))}
          </div>
        </>
      )}

      {/* No orders message */}
      {filteredOrders.length === 0 && (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No {filterStatus !== "all" ? filterStatus : ""} orders available</p>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;