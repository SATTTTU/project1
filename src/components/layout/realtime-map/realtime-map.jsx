"use client";

import DeliveryTracking from "@/app/routes/realmap/deliverytracking";
import { api } from "@/lib/api-client";
import { useEffect, useState } from "react";

export const CustomerDeliveryTracker = ({ orderId }) => {
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        // Add clear logging to debug
        console.log("Fetching order with ID:", orderId);

        if (!orderId) {
          throw new Error("Order ID is undefined or missing");
        }

        setLoading(true);

        const response = await api.get(
          `/api/cooks/orders/index?orderId=${orderId}`
        );
        console.log("API response:", response);

        // Get the array of orders
        const orders = response.data;

        if (!Array.isArray(orders)) {
          console.error("Unexpected response structure:", orders);
          throw new Error("Invalid response format from server");
        }

        // Convert orderId to number for comparison
        const numericOrderId = Number(orderId);
        console.log(
          "Looking for order with ID:",
          numericOrderId,
          "in",
          orders.length,
          "orders"
        );

        // Find the order matching the provided order id
        const matchingOrder = orders.find(
          (order) => order.order_id === numericOrderId
        );

        if (!matchingOrder) {
          throw new Error("Order not found in response data");
        }

        setOrderData(matchingOrder);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching order:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchOrderData();
  }, [orderId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center p-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-700">Loading order information...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 bg-red-50 text-red-700 max-w-md mx-auto mt-8 rounded-lg shadow-md">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="h-screen">
      <DeliveryTracking orderId={orderId} />
    </div>
  );
};

export default CustomerDeliveryTracker;
