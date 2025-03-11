// src/hooks/useOrders.js
import { useState } from "react";

export const useOrders = () => {
  // Sample orders data with different statuses
  const [orders, setOrders] = useState([
    {
      id: "ORD-7831",
      customerName: "Anish Thapa",
      items: [
        { name: "Chicken Momo", quantity: 2, price: 180 },
        { name: "Aloo Paratha", quantity: 1, price: 90 },
      ],
      status: "Ongoing",
      timeRemaining: "35 mins",
      date: "Today, 3:45 PM",
      total: 450,
      address: "Block C, Thamel, Kathmandu",
    },
    {
      id: "ORD-7830",
      customerName: "Meera Joshi",
      items: [
        { name: "Veg Thali", quantity: 2, price: 220 },
        { name: "Mango Lassi", quantity: 2, price: 80 },
      ],
      status: "Preparing",
      timeRemaining: "20 mins",
      date: "Today, 3:15 PM",
      total: 600,
      address: "Maharajgunj, House 45, Kathmandu",
    },
    {
      id: "ORD-7829",
      customerName: "Rahul Sharma",
      items: [
        { name: "Butter Chicken", quantity: 1, price: 250 },
        { name: "Naan", quantity: 2, price: 50 },
      ],
      status: "Completed",
      date: "Today, 2:30 PM",
      total: 350,
      address: "Baneshwor, Kathmandu",
    },
    {
      id: "ORD-7823",
      customerName: "Priya Patel",
      items: [
        { name: "Paneer Tikka", quantity: 1, price: 180 },
        { name: "Jeera Rice", quantity: 1, price: 100 },
      ],
      status: "Completed",
      date: "Today, 1:15 PM",
      total: 280,
      address: "Patan, Lalitpur",
    },
    {
      id: "ORD-7814",
      customerName: "Amit Kumar",
      items: [
        { name: "Veg Biryani", quantity: 1, price: 200 },
        { name: "Raita", quantity: 1, price: 20 },
      ],
      status: "Cancelled",
      date: "Today, 12:45 PM",
      total: 220,
      address: "Bhaktapur Chowk",
    },
  ]);

  // Function to update order status
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  return { orders, updateOrderStatus };
};
