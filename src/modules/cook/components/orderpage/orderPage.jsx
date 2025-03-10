import React from "react";
import { useState } from "react";

import { FaArrowRight, FaBell, FaUser } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { Sidebar } from "../../../../components/ui/sideBar/sidebar";
import CookNavBAr from "../../../../components/ui/cooknavbar/cooknavbar";

export const OrderPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Sample total earnings
  const totalEarnings = 12580;

  // Sample orders data
  const orders = [
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
    },
    {
      id: "ORD-7814",
      customerName: "Amit Kumar",
      items: [
        { name: "Veg Biryani", quantity: 1, price: 200 },
        { name: "Raita", quantity: 1, price: 20 },
      ],
      status: "Completed",
      date: "Today, 12:45 PM",
      total: 220,
    },
    {
      id: "ORD-7809",
      customerName: "Sneha Gupta",
      items: [
        { name: "Chicken Biryani", quantity: 2, price: 220 },
        { name: "Raita", quantity: 2, price: 20 },
      ],
      status: "Completed",
      date: "Yesterday, 7:30 PM",
      total: 480,
    },
    {
      id: "ORD-7798",
      customerName: "Vikram Singh",
      items: [
        { name: "Dal Makhani", quantity: 1, price: 150 },
        { name: "Butter Naan", quantity: 3, price: 40 },
      ],
      status: "Completed",
      date: "Yesterday, 6:15 PM",
      total: 270,
    },
  ];

  return (
    <div className="flex h-screen flex-col">
      {/* Header */}
      <CookNavBAr />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar></Sidebar>

        {/* Main content */}
        <main className="flex-1 overflow-auto p-4 md:p-6 bg-gray-50">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Orders</h1>
            <p className="text-sm text-gray-500">
              Manage your orders and payments
            </p>
          </div>

          {/* Earnings Summary */}
          <div className="mb-8 rounded-lg bg-white p-6 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-lg font-medium text-gray-700">
                  Total Earnings
                </h2>
                <p className="mt-1 text-3xl font-bold">
                  ₹{totalEarnings.toLocaleString()}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Last withdrawal: 15 days ago
                </p>
              </div>
              <button className="mt-4 md:mt-0 flex items-center rounded-md bg-[#426B1F] px-4 py-2 text-white hover:bg-[#365818]">
                Withdraw Funds
                <FaArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Orders Table */}
          <div className="rounded-lg border bg-white shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                      Order ID
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                      Customer
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                      Food Items
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                      Status
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-4 text-sm font-medium">
                        {order.id}
                      </td>
                      <td className="px-4 py-4 text-sm">
                        {order.customerName}
                      </td>
                      <td className="px-4 py-4 text-sm">
                        <div className="space-y-1">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex justify-between">
                              <span>
                                {item.name} x{item.quantity}
                              </span>
                              <span className="text-gray-500">
                                ₹{item.price * item.quantity}
                              </span>
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500">
                        {order.date}
                      </td>
                      <td className="px-4 py-4 text-sm">
                        <span className="inline-flex rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                          {order.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-right text-sm font-medium">
                        ₹{order.total}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
