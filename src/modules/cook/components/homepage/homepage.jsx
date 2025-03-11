import React, { useState } from "react";
import authimage from "../../../../assets/auth.png";
import butterchicken from "../../../../assets/butterchicken.png";
import { Sidebar } from "../../../../components/ui/sideBar/sidebar";
import CookNavBAr from "../../../../components/ui/cooknavbar/cooknavbar";

export const homepage = () => {
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

  return (
    <div className="flex h-screen flex-col">
      {/* Header */}
      <CookNavBAr />
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        {/* Main content */}
        <main className="flex-1 overflow-auto p-4 md:p-6 bg-gray-50">
          {/* Dashboard Header with Stats */}
          <div className="mb-6 p-4 bg-white rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-lg font-semibold">Cook Dashboard</h2>
                <p className="text-sm text-gray-500">Welcome back, Chef!</p>
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

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                <p className="text-sm text-gray-600">Today's Earnings</p>
                <h3 className="text-xl font-bold">₹{earnings.today}</h3>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <p className="text-sm text-gray-600">This Week</p>
                <h3 className="text-xl font-bold">₹{earnings.thisWeek}</h3>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                <p className="text-sm text-gray-600">This Month</p>
                <h3 className="text-xl font-bold">₹{earnings.thisMonth}</h3>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                <p className="text-sm text-gray-600">Pending Payout</p>
                <h3 className="text-xl font-bold">₹{earnings.pendingPayout}</h3>
              </div>
            </div>
          </div>

          {/* Tabs for Orders/Menu */}
          <div className="mb-6">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex">
                <button
                  className={`py-4 px-6 font-medium text-sm ${
                    activeTab === "orders"
                      ? "border-b-2 border-[#426B1F] text-[#426B1F]"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("orders")}
                >
                  Order Management
                </button>
                <button
                  className={`py-4 px-6 font-medium text-sm ${
                    activeTab === "menu"
                      ? "border-b-2 border-[#426B1F] text-[#426B1F]"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("menu")}
                >
                  Your Menu
                </button>
                <button
                  className={`py-4 px-6 font-medium text-sm ${
                    activeTab === "insights"
                      ? "border-b-2 border-[#426B1F] text-[#426B1F]"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("insights")}
                >
                  Insights & Analytics
                </button>
              </nav>
            </div>
          </div>

          {activeTab === "orders" && (
            <>
              {/* New Order Requests */}
              <h2 className="mb-4 text-xl font-bold">New Order Requests</h2>
              <div className="grid gap-4 mb-8">
                {orderRequests.map((order) => (
                  <div
                    key={order.id}
                    className="rounded-lg bg-white p-4 shadow-md hover:shadow-lg transition-all"
                  >
                    <div className="flex items-start">
                      <img
                        src={order.image}
                        alt="Customer"
                        className="h-20 w-20 rounded-md object-cover mr-4"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-semibold">
                            {order.customerName}
                          </h3>
                          <span className="text-sm text-gray-500">
                            {order.time}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 mt-1">
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Items:</span>{" "}
                            {order.items.join(", ")}
                          </p>
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Distance:</span>{" "}
                            {order.distance}
                          </p>
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Payment:</span>{" "}
                            {order.paymentMethod}
                          </p>
                          <p className="text-sm font-medium text-[#426B1F]">
                            Total: ₹{order.total}
                          </p>
                        </div>
                        <div className="mt-3 flex gap-2">
                          <button className="flex items-center cursor-pointer rounded-md bg-[#426B1F] px-3 py-1.5 text-sm font-medium text-white hover:bg-[#365818]">
                            Accept Order
                          </button>
                          <button className="flex items-center cursor-pointer rounded-md bg-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-300">
                            Reject
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Active Orders */}
              <h2 className="mb-4 text-xl font-bold">Active Orders</h2>
              <div className="grid gap-4 mb-8">
                {activeOrders.map((order) => (
                  <div
                    key={order.id}
                    className="rounded-lg bg-white p-4 shadow-md hover:shadow-lg transition-all"
                  >
                    <div className="flex items-start">
                      <img
                        src={order.image}
                        alt="Customer"
                        className="h-20 w-20 rounded-md object-cover mr-4"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-semibold">
                            {order.customerName}
                          </h3>
                          <span
                            className={`px-3 py-1 text-xs rounded-full ${
                              order.status === "preparing"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {order.status === "preparing"
                              ? "Preparing"
                              : "Ready for Pickup"}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          <span className="font-medium">Items:</span>{" "}
                          {order.items.join(", ")}
                        </p>
                        <div className="grid grid-cols-2 gap-1 mt-1">
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Accepted:</span>{" "}
                            {order.timeAccepted}
                          </p>
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Delivery in:</span>{" "}
                            {order.estimatedDelivery}
                          </p>
                          <p className="text-sm font-medium text-[#426B1F]">
                            Total: ₹{order.total}
                          </p>
                        </div>
                        <div className="mt-3 flex gap-2">
                          {order.status === "preparing" ? (
                            <button className="flex items-center cursor-pointer rounded-md bg-green-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-green-700">
                              Mark as Ready
                            </button>
                          ) : (
                            <button className="flex items-center cursor-pointer rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700">
                              Handed to Delivery
                            </button>
                          )}
                          <button className="flex items-center cursor-pointer rounded-md bg-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-300">
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === "menu" && (
            <>
              {/* Food Items Menu Management */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Your Menu Items</h2>
                <div className="flex gap-2">
                  <button className="flex items-center rounded-md cursor-pointer bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200">
                    Sort by Popularity
                  </button>
                </div>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {foodItems.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-lg bg-white shadow-sm overflow-hidden hover:shadow-md transition-all"
                  >
                    <div className="relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-48 w-full object-cover"
                      />
                      <span className="absolute top-2 right-2 px-2 py-1 text-xs rounded-full bg-white font-medium">
                        ★ {item.popularityRating}
                      </span>
                      {!item.available && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                          <span className="px-3 py-1 bg-red-600 text-white rounded-full text-sm font-medium">
                            Currently Unavailable
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-semibold">{item.name}</h3>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={item.available}
                            className="sr-only peer"
                          />
                          <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#426B1F]"></div>
                        </label>
                      </div>
                      <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                        {item.description}
                      </p>
                      <div className="mt-2 text-xs text-gray-500">
                        {item.orderCount} orders this month
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-lg font-bold">₹{item.price}</span>
                        <button className="rounded-md bg-gray-100 px-3 py-1 text-xs text-gray-600 hover:bg-gray-200">
                          Edit Item
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === "insights" && (
            <>
              {/* Simple Analytics and Insights */}
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-4">Performance Insights</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Most Popular Items Card */}
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h3 className="font-medium mb-3">Most Popular Items</h3>
                    <div className="space-y-3">
                      {foodItems
                        .sort((a, b) => b.orderCount - a.orderCount)
                        .slice(0, 3)
                        .map((item, index) => (
                          <div key={item.id} className="flex items-center">
                            <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center mr-2 text-sm">
                              {index + 1}
                            </span>
                            <div className="flex-1">
                              <p className="font-medium">{item.name}</p>
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-500">
                                  ₹{item.price}
                                </span>
                                <span className="text-sm text-gray-500">
                                  {item.orderCount} orders
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* Weekly Performance */}
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h3 className="font-medium mb-3">Weekly Performance</h3>
                    <div className="h-48 flex items-end justify-between p-2">
                      {/* Simple bar chart visualization */}
                      <div className="flex flex-col items-center">
                        <div
                          className="w-8 bg-green-200 rounded-t-sm"
                          style={{ height: "60%" }}
                        ></div>
                        <span className="text-xs mt-1">Mon</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div
                          className="w-8 bg-green-300 rounded-t-sm"
                          style={{ height: "80%" }}
                        ></div>
                        <span className="text-xs mt-1">Tue</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div
                          className="w-8 bg-green-400 rounded-t-sm"
                          style={{ height: "70%" }}
                        ></div>
                        <span className="text-xs mt-1">Wed</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div
                          className="w-8 bg-green-500 rounded-t-sm"
                          style={{ height: "90%" }}
                        ></div>
                        <span className="text-xs mt-1">Thu</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div
                          className="w-8 bg-green-600 rounded-t-sm"
                          style={{ height: "100%" }}
                        ></div>
                        <span className="text-xs mt-1">Fri</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div
                          className="w-8 bg-green-700 rounded-t-sm"
                          style={{ height: "95%" }}
                        ></div>
                        <span className="text-xs mt-1">Sat</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div
                          className="w-8 bg-green-800 rounded-t-sm"
                          style={{ height: "75%" }}
                        ></div>
                        <span className="text-xs mt-1">Sun</span>
                      </div>
                    </div>
                  </div>

                  {/* Customer Feedback */}
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h3 className="font-medium mb-3">
                      Recent Customer Feedback
                    </h3>
                    <div className="space-y-3">
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex justify-between">
                          <p className="font-medium">Priya Patel</p>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <span key={star} className="text-yellow-400">
                                ★
                              </span>
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          "The paneer tikka was delicious! Will order again."
                        </p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex justify-between">
                          <p className="font-medium">Rahul Sharma</p>
                          <div className="flex">
                            {[1, 2, 3, 4].map((star) => (
                              <span key={star} className="text-yellow-400">
                                ★
                              </span>
                            ))}
                            <span className="text-gray-300">★</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          "Butter chicken was good but could be a bit more
                          spicy."
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Quick Tips */}
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h3 className="font-medium mb-3">
                      Tips to Increase Orders
                    </h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        <p>Consider offering weekend special dishes</p>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        <p>
                          Your Butter Chicken is popular - add complementary
                          sides
                        </p>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        <p>Peak order times are 6-8 PM - ensure availability</p>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        <p>Consider adding a combo meal option</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};
