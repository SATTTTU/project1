import React from "react";
import { OrderHeader } from "./orderheader";
import { OrderDetails } from "./orderdetails";
import { OrderItems } from "./orderitems";
import { OrderStatusUpdate } from "./orderactions";
import { useNavigate } from "react-router-dom";

export const OrderCard = ({ order, updateOrderStatus }) => {
  const navigate = useNavigate();

  const handleTrackOrder = () => {
    if (order && order.order_id) {
      const orderId = order.order_id.toString();
      navigate(`/cook/order-tracking/${orderId}`);
    }
  };

  return (
    <div className="rounded-lg border border-slate-300 bg-white shadow-sm overflow-hidden hover:shadow-md transition-all">
      <OrderHeader order={order} />
      <div className="p-4 space-y-4">
        <OrderDetails order={order} />
        <OrderItems items={order.items || []} />
        <div className="flex flex-col sm:flex-row sm:justify-between gap-2 mt-4">
          <OrderStatusUpdate 
            order={order} 
            updateOrderStatus={updateOrderStatus} 
          />
          {order.status === "out-for-delivery" && (
            <button
              onClick={handleTrackOrder}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium"
            >
              Track Order
            </button>
          )}
        </div>
      </div>
    </div>
  );
};