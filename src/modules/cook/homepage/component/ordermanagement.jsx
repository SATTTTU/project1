import React from "react";
import OrderRequest from "./orderrequest";
import ActiveOrder from "./activeorder";

const OrderManagement = ({ orderRequests, activeOrders }) => {
  return (
    <>
      {/* New Order Requests */}
      <h2 className="mb-4 text-xl font-bold">New Order Requests</h2>
      <div className="grid gap-4 mb-8">
        {orderRequests.map((order) => (
          <OrderRequest key={order.id} order={order} />
        ))}
      </div>

      {/* Active Orders */}
      <h2 className="mb-4 text-xl font-bold">Active Orders</h2>
      <div className="grid gap-4 mb-8">
        {activeOrders.map((order) => (
          <ActiveOrder key={order.id} order={order} />
        ))}
      </div>
    </>
  );
};

export default OrderManagement;
