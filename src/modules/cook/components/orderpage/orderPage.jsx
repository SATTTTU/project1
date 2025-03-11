import React, { useState } from "react";
import { FiFilter } from "react-icons/fi";
import { Sidebar } from "../../../../components/ui/sideBar/sidebar";
import CookNavBAr from "../../../../components/ui/cooknavbar/cooknavbar";

export const OrderPage = () => {
  const [filterStatus, setFilterStatus] = useState("Ongoing");

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

  // Filter orders based on status
  const filteredOrders =
    filterStatus === "All"
      ? orders
      : orders.filter((order) =>
          filterStatus === "Ongoing"
            ? order.status === "Ongoing" || order.status === "Preparing"
            : order.status === filterStatus
        );

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Ongoing":
        return "bg-blue-100 text-blue-800";
      case "Preparing":
        return "bg-yellow-100 text-yellow-800";
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      case "Ready":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="flex h-screen flex-col">
      <CookNavBAr />

      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 overflow-auto p-4 md:p-6 bg-gray-50">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold">Orders</h1>
              <p className="text-sm text-gray-500">
                {filterStatus === "Ongoing"
                  ? "Currently active orders"
                  : `${filterStatus} orders`}
              </p>
            </div>

            <div className="flex space-x-2">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#426B1F] focus:outline-none focus:ring-1 focus:ring-[#426B1F]"
              >
                <option value="Ongoing">Ongoing & Preparing</option>
                <option value="Ready">Ready</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
                <option value="All">All Orders</option>
              </select>
            </div>
          </div>

          {/* Order Cards for Ongoing Orders */}
          <div className="space-y-4">
            {filteredOrders.length === 0 ? (
              <div className="rounded-lg border bg-white p-8 text-center shadow-sm">
                <p className="text-gray-500">
                  No {filterStatus.toLowerCase()} orders found
                </p>
              </div>
            ) : (
              filteredOrders.map((order) => (
                <div
                  key={order.id}
                  className="rounded-lg border bg-white shadow-sm overflow-hidden"
                >
                  <div className="flex justify-between items-center border-b bg-gray-50 px-4 py-3">
                    <div className="flex items-center">
                      <span className="font-medium">{order.id}</span>
                      <span className="mx-2 text-gray-300">•</span>
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${getStatusBadgeClass(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">{order.date}</div>
                  </div>

                  <div className="p-4">
                    <div className="flex flex-col md:flex-row md:justify-between">
                      <div className="mb-4 md:mb-0">
                        <h3 className="font-medium">{order.customerName}</h3>
                        <p className="text-sm text-gray-500">{order.address}</p>

                        {(order.status === "Ongoing" ||
                          order.status === "Preparing") && (
                          <div className="mt-2 flex items-center text-sm">
                            <svg
                              className="mr-1 h-4 w-4 text-[#426B1F]"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            <span>
                              Time remaining:{" "}
                              <span className="font-medium">
                                {order.timeRemaining}
                              </span>
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="text-right">
                        <p className="text-lg font-bold">₹{order.total}</p>
                        <p className="text-xs text-gray-500">
                          {order.items.length} items
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t">
                      <h4 className="text-sm font-medium mb-2">Order Items</h4>
                      <div className="space-y-2">
                        {order.items.map((item, index) => (
                          <div
                            key={index}
                            className="flex justify-between text-sm"
                          >
                            <span>
                              {item.name}{" "}
                              <span className="text-gray-500">
                                x{item.quantity}
                              </span>
                            </span>
                            <span>₹{item.price * item.quantity}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t flex flex-wrap gap-2">
                      {order.status === "Ongoing" && (
                        <>
                          <button
                            onClick={() =>
                              updateOrderStatus(order.id, "Preparing")
                            }
                            className="rounded-md bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600"
                          >
                            Start Preparing
                          </button>
                          <button
                            onClick={() =>
                              updateOrderStatus(order.id, "Cancelled")
                            }
                            className="rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                          >
                            Cancel Order
                          </button>
                        </>
                      )}

                      {order.status === "Preparing" && (
                        <button
                          onClick={() => updateOrderStatus(order.id, "Ready")}
                          className="rounded-md bg-purple-500 px-4 py-2 text-white hover:bg-purple-600"
                        >
                          Mark as Ready
                        </button>
                      )}

                      {order.status === "Ready" && (
                        <button
                          onClick={() =>
                            updateOrderStatus(order.id, "Completed")
                          }
                          className="rounded-md bg-[#426B1F] px-4 py-2 text-white hover:bg-[#365818]"
                        >
                          Complete Order
                        </button>
                      )}

                      {order.status !== "Completed" &&
                        order.status !== "Cancelled"}

                      {order.status === "Completed" && (
                        <span className="text-green-600 font-medium">
                          Order completed successfully!
                        </span>
                      )}

                      {order.status === "Cancelled" && (
                        <span className="text-red-600 font-medium">
                          Order has been cancelled
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
};
