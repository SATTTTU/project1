import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUpdateOrderStatus } from "../../orders/api/updateOrders";
import Dishes from "../../../../assets/defaultDishes.jpg";

export const OrderRequestCard = ({ order, updateOrderStatus }) => {
  const [status, setStatus] = useState(order.status);
  const navigate = useNavigate();
  const { mutate: updateStatus, isLoading } = useUpdateOrderStatus();

  const imageBaseUrl = "https://khajabox-bucket.s3.ap-south-1.amazonaws.com/";

  const statusFlow = {
    pending: ["accepted"],
    accepted: ["preparing"],
    preparing: ["out-for-delivery"],
    "out-for-delivery": []
  };

  const handleStatusChange = (event) => {
    const newStatus = event.target.value;
    if (statusFlow[status]?.includes(newStatus) || newStatus === status) {
      setStatus(newStatus);
      updateOrderStatus(order.order_id, newStatus);
      updateStatus(
        { order_id: order.order_id, status: newStatus },
        {
          onSuccess: () => {
            if (newStatus === "out-for-delivery") handleTrackOrder();
          }
        }
      );
    } else {
      alert(`Cannot change status from ${status} to ${newStatus}. Invalid transition.`);
    }
  };

  const handleTrackOrder = () => {
    navigate(`/cook/order-tracking/${order.order_id}`);
  };

  const getNextAction = (currentStatus) => {
    switch (currentStatus) {
      case "pending":
        return { status: "accepted", text: "Accept Order", style: "bg-blue-600 hover:bg-blue-700" };
      case "accepted":
        return { status: "preparing", text: "Start Preparing", style: "bg-orange-600 hover:bg-orange-700" };
      case "preparing":
        return { status: "out-for-delivery", text: "Mark as Ready", style: "bg-green-600 hover:bg-green-700" };
      case "out-for-delivery":
        return { status: "out-for-delivery", text: "Track Order", style: "bg-gray-600 hover:bg-gray-700" };
      default:
        return { status: "", text: "Update Status", style: "bg-blue-600 hover:bg-blue-700" };
    }
  };

  const nextAction = getNextAction(status);

  const handleActionButton = () => {
    if (status === "out-for-delivery") return handleTrackOrder();
    if (nextAction.status && statusFlow[status]?.includes(nextAction.status)) {
      setStatus(nextAction.status);
      updateOrderStatus(order.order_id, nextAction.status);
      updateStatus(
        { order_id: order.order_id, status: nextAction.status },
        {
          onSuccess: () => {
            if (nextAction.status === "out-for-delivery") handleTrackOrder();
          }
        }
      );
    }
  };

 

  // Calculate total amount from all items
  const totalAmount = parseFloat(
    order.total || order.items?.reduce((acc, item) => acc + parseFloat(item.price) * item.quantity, 0)
  ).toFixed(2);

  // Get the thumbnail image (first item's image or default)
 


  return (
    <div className="rounded-lg bg-white p-4 shadow-md hover:shadow-lg transition-all">
      <div className="flex items-start">
      
        <div className="flex-1">
          <div className="flex justify-between">
            <h3 className="font-semibold text-gray-800">Order</h3>
            <span className={`px-3 py-1 text-xs rounded-full ${
              status === "pending" ? "bg-yellow-100 text-yellow-800" : 
              status === "accepted" ? "bg-blue-100 text-blue-800" : 
              status === "preparing" ? "bg-orange-100 text-orange-800" : 
              "bg-green-100 text-green-800"
            }`}>
              {status.charAt(0).toUpperCase() + status.slice(1).replace(/-/g, ' ')}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-1 mt-1">
            <p className="text-sm text-gray-600">
              <span className="font-medium">Order ID:</span> #{order.order_id}
            </p>
            {order.timeAccepted && (
              <p className="text-sm text-gray-600">
                <span className="font-medium">Accepted:</span> {order.timeAccepted}
              </p>
            )}
            {order.estimatedDelivery && (
              <p className="text-sm text-gray-600">
                <span className="font-medium">Delivery in:</span> {order.estimatedDelivery}
              </p>
            )}
            <p className="text-sm font-medium text-[#426B1F] col-span-2">
              Total: Rs{totalAmount}
            </p>
          </div>

          <div className="mt-3 flex gap-2">
            <button
              onClick={handleActionButton}
              className={`flex items-center cursor-pointer rounded-md ${nextAction.style} px-3 py-1.5 text-sm font-medium text-white`}
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : nextAction.text}
            </button>
           
          </div>
        </div>
      </div>

      <div className="mt-4 border-t pt-3">
  <h4 className="text-sm font-semibold mb-2">Order Items</h4>
  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
    {order.items && order.items.map((item) => (
      <div
        key={item.order_item_id}
        className="flex items-center justify-between py-2 border-b border-gray-100"
      >
        {/* Item Image */}
        <img
          src={item.menu_item?.image_url ? `${imageBaseUrl}${item.menu_item.image_url}` : Dishes}
          alt={item.menu_item?.name}
          className="w-16 h-16 object-cover rounded-lg shadow-md border border-slate-300"
        />

        {/* Item Info */}
        <div className="flex-1 px-3">
          <div className="text-sm font-medium text-gray-800">{item.menu_item?.name || "Item"}</div>
          <div className="text-sm text-gray-500">Qty: x{item.quantity}</div>
        </div>

        {/* Price */}
        <div className="text-sm text-gray-700 font-semibold whitespace-nowrap">
          Rs {parseFloat(item.price).toFixed(2)}
        </div>
      </div>
    ))}
  </div>
</div>


     
    </div>
  );
};