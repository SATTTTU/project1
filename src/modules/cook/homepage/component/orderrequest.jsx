import React from "react";
import { useGetUserOrder } from "../api/getUserOrder";

const OrderRequestCard = ({ order }) => {
  return (
    <div className="bg-white border rounded-lg shadow-md p-4 mb-4">
      <div className="flex items-center space-x-4 mb-3">
        <img 
          src={order.image} 
          alt={order.items[0]} 
          className="w-16 h-16 rounded-md object-cover"
        />
        <div>
          <h3 className="font-semibold text-lg">{order.customerName}</h3>
          <p className="text-sm text-gray-600">
            {order.items.join(", ")}
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-2 text-sm text-gray-600 mb-3">
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{order.time}</span>
        </div>
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{order.distance}</span>
        </div>
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span>{order.paymentMethod}</span>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <span className="font-bold text-lg">₹{order.total.toFixed(2)}</span>
        <div className="space-x-2">
          <button className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition-colors">
            Accept
          </button>
          <button className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-colors">
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

const OrderRequestsList = () => {
  const { data, isLoading, error } = useGetUserOrder();

  if (isLoading) return <p>Loading orders...</p>;
  if (error) return <p>Error fetching orders</p>;

  const orders = data?.data || [];

  return (
    <div className="max-w-md mx-auto">
      {orders.length > 0 ? (
        orders.map((order) => (
          <OrderRequestCard
            key={order.order_id}
            order={{
              id: order.order_id,
              customerName: order.user.name,
              image: order.items[0]?.menu_item.image_url || "/default.png",
              items: order.items.map((item) => `${item.menu_item.name} (x${item.quantity})`),
              distance: "2 km",
              paymentMethod: "Cash on Delivery",
              total: order.items.reduce((sum, item) => sum + parseFloat(item.total), 0),
              time: "Just now"
            }}
          />
        ))
      ) : (
        <p>No orders available</p>
      )}
    </div>
  );
};

export default OrderRequestsList;