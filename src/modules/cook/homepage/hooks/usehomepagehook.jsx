import { useState } from "react";
import authimage from "../../../../assets/auth.png";
import butterchicken from "../../../../assets/butterchicken.png";

export const useHomepage = () => {
  const [isOnline, setIsOnline] = useState(false);
  const [activeTab, setActiveTab] = useState("orders");

  // Sample order requests
  const orderRequests = [
    {
      id: 1,
      customerName: "Rahul Sharma",
      items: ["Butter Chicken", "Naan"],
      time: "15 minutes ago",
      total: 350,
      image: authimage,
      distance: "1.2 km",
      paymentMethod: "Online Payment",
      status: "pending",
    },
    {
      id: 2,
      customerName: "Priya Patel",
      items: ["Paneer Tikka", "Jeera Rice"],
      time: "22 minutes ago",
      total: 280,
      image: authimage,
      distance: "0.8 km",
      paymentMethod: "Cash on Delivery",
      status: "pending",
    },
    {
      id: 3,
      customerName: "Amit Kumar",
      items: ["Veg Biryani", "Raita"],
      time: "30 minutes ago",
      total: 220,
      image: authimage,
      distance: "2.5 km",
      paymentMethod: "Online Payment",
      status: "pending",
    },
  ];

  // Sample active orders
  const activeOrders = [
    {
      id: 4,
      customerName: "Neha Gupta",
      items: ["Dal Makhani", "Butter Naan", "Raita"],
      timeAccepted: "10 minutes ago",
      estimatedDelivery: "25 minutes",
      total: 320,
      image: authimage,
      status: "preparing",
    },
    {
      id: 5,
      customerName: "Vikram Singh",
      items: ["Chicken Biryani", "Boondi Raita"],
      timeAccepted: "15 minutes ago",
      estimatedDelivery: "10 minutes",
      total: 240,
      image: authimage,
      status: "ready for pickup",
    },
  ];

  // Sample food items
  const foodItems = [
    {
      id: 1,
      name: "Butter Chicken",
      price: 250,
      description: "Tender chicken in a rich, creamy tomato sauce",
      image: butterchicken,
      available: true,
      popularityRating: 4.8,
      orderCount: 120,
    },
    {
      id: 2,
      name: "Paneer Tikka",
      price: 180,
      description: "Grilled cottage cheese with spices and vegetables",
      image: authimage, // Using authimage as placeholder
      available: true,
      popularityRating: 4.5,
      orderCount: 95,
    },
    {
      id: 3,
      name: "Veg Biryani",
      price: 200,
      description: "Fragrant rice with mixed vegetables and spices",
      image: authimage, // Using authimage as placeholder
      available: false,
      popularityRating: 4.2,
      orderCount: 78,
    },
    {
      id: 4,
      name: "Chicken Biryani",
      price: 220,
      description: "Aromatic rice with tender chicken pieces",
      image: authimage, // Using authimage as placeholder
      available: true,
      popularityRating: 4.7,
      orderCount: 115,
    },
  ];

  // Earnings summary
  const earnings = {
    today: 2450,
    thisWeek: 14890,
    thisMonth: 58200,
    pendingPayout: 12450,
  };

  return {
    isOnline,
    setIsOnline,
    activeTab,
    setActiveTab,
    orderRequests,
    activeOrders,
    foodItems,
    earnings,
  };
};

export default useHomepage;
