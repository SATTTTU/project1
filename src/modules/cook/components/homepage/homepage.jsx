import React from "react";
import { useState } from "react";
import authimage from "../../../../assets/auth.png";
import butterchicken from "../../../../assets/butterchicken.png";

import {
  FaBell,
  FaClock,
  FaDollarSign,
  FaHome,
  FaShoppingBag,
  FaUser,
  FaUtensils,
} from "react-icons/fa";
import { FiMenu } from "react-icons/fi";

import { Sidebar } from "../../../../components/ui/sideBar/sidebar";
export const homepage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isOnline, setIsOnline] = useState(false);

  // Sample order requests
  const orderRequests = [
    {
      id: 1,
      customerName: "Rahul Sharma",
      items: ["Butter Chicken", "Naan"],
      time: "15 minutes ago",
      total: 350,
      image: { authimage },
    },
    {
      id: 2,
      customerName: "Priya Patel",
      items: ["Paneer Tikka", "Jeera Rice"],
      time: "22 minutes ago",
      total: 280,
      image: { authimage },
    },
    {
      id: 3,
      customerName: "Amit Kumar",
      items: ["Veg Biryani", "Raita"],
      time: "30 minutes ago",
      total: 220,
      image: { authimage },
    },
  ];

  // Sample food items
  const foodItems = [
    {
      id: 1,
      name: "Butter Chicken",
      price: 250,
      description: "Tender chicken in a rich, creamy tomato sauce",
      image: { butterchicken },
    },
    {
      id: 2,
      name: "Paneer Tikka",
      price: 180,
      description: "Grilled cottage cheese with spices and vegetables",
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      id: 3,
      name: "Veg Biryani",
      price: 200,
      description: "Fragrant rice with mixed vegetables and spices",
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      id: 4,
      name: "Chicken Biryani",
      price: 220,
      description: "Aromatic rice with tender chicken pieces",
      image: "/placeholder.svg?height=150&width=150",
    },
  ];

  return (
    <div className="flex h-screen flex-col">
      {/* Header */}
      <header className="flex h-16 items-center justify-between shadow-md px-4 md:px-6 bg-white">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden rounded-md p-2 hover:bg-gray-100"
          >
            <FiMenu className="h-6 w-6" />
            <span className="sr-only">Toggle sidebar</span>
          </button>
          <h1 className="text-xl font-bold text-[#426B1F]">KhanaBox</h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="relative rounded-full p-2 hover:bg-gray-100">
            <FaBell className="h-6 w-6" />
            <span className="absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs text-white">
              3
            </span>
            <span className="sr-only">Notifications</span>
          </button>
          <button className="rounded-full p-2 hover:bg-gray-100">
            <FaUser className="h-6 w-6" />
            <span className="sr-only">User profile</span>
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar></Sidebar>

        {/* Main content */}
        <main className="flex-1 overflow-auto p-4 md:p-6 bg-gray-50">
          {/* Online Status Toggle */}
          <div className="mb-6 flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
            <div>
              <h2 className="text-lg font-semibold">Cook Dashboard</h2>
              <p className="text-sm text-gray-500">
                Manage your orders and menu
              </p>
            </div>
            <button
              onClick={() => setIsOnline(!isOnline)}
              className={`px-4 py-2 rounded-full cursor-pointer font-medium ${
                isOnline
                  ? "bg-[#426B1F] text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {isOnline ? "Online" : "Go Online"}
            </button>
          </div>

          {/* New Order Requests */}
          <h2 className="mb-4 text-xl font-bold">New Order Requests</h2>
          <div className="grid gap-4 mb-8">
            {orderRequests.map((order) => (
              <div
                key={order.id}
                className="rounded-lg  bg-white p-4 shadow-lg"
              >
                <div className="flex items-start">
                  <img
                    src={order.image}
                    alt="Food"
                    className="h-20 w-20 rounded-md object-cover mr-4"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-semibold">{order.customerName}</h3>
                      <span className="text-sm text-gray-500">
                        {order.time}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {order.items.join(", ")}
                    </p>
                    <p className="font-medium mt-1">₹{order.total}</p>
                    <div className="mt-3 flex gap-2">
                      <button className="flex items-center cursor-pointer rounded-md bg-[#426B1F] px-3 py-1.5 text-sm font-medium text-white hover:bg-[#365818]">
                        {/* <Check className="mr-1 h-4 w-4" /> */}
                        Accept
                      </button>
                      <button className="flex items-center cursor-pointer rounded-md bg-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-300">
                        {/* <X className="mr-1 h-4 w-4" /> */}
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Food Items */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Your Menu Items</h2>
            <button className="flex items-center rounded-md cursor-pointer bg-[#426B1F] px-3 py-2 text-sm font-medium text-white hover:bg-[#365818]">
              {/* <Plus className="mr-1 h-4 w-4" /> */}
              Add Item
            </button>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {foodItems.map((item) => (
              <div
                key={item.id}
                className="rounded-lg  bg-white shadow-sm overflow-hidden"
              >
                <div className="p-2">
                  <img
                    src={authimage}
                    alt={item.name}
                    className="h-36 w-full rounded-md object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {item.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-bold">₹{item.price}</span>
                    <button className="rounded-full bg-gray-100 p-1.5 text-gray-600 hover:bg-gray-200">
                      {/* <Menu className="h-5 w-5" /> */}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};
