import React, { useState, useMemo } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Sidebar } from "../../../../components/ui/sideBar/sidebar";
import CookNavBAr from "../../../../components/ui/cooknavbar/cooknavbar";

export const historyPage = () => {
  // Sample history data (typically would come from API/props)
  const historyItems = [
    {
      id: "ORD-7829",
      customerName: "Rahul Sharma",
      items: [
        { name: "Butter Chicken", quantity: 1 },
        { name: "Naan", quantity: 2 },
      ],
      status: "Delivered",
      date: "Today, 2:30 PM",
      total: 350,
      timestamp: new Date().getTime(),
    },
    {
      id: "ORD-7823",
      customerName: "Priya Patel",
      items: [
        { name: "Paneer Tikka", quantity: 1 },
        { name: "Jeera Rice", quantity: 1 },
      ],
      status: "Delivered",
      date: "Today, 1:15 PM",
      total: 280,
      timestamp: new Date().getTime() - 3600000, // 1 hour ago
    },
    {
      id: "ORD-7814",
      customerName: "Amit Kumar",
      items: [
        { name: "Veg Biryani", quantity: 1 },
        { name: "Raita", quantity: 1 },
      ],
      status: "Delivered",
      date: "Today, 12:45 PM",
      total: 220,
      timestamp: new Date().getTime() - 7200000, // 2 hours ago
    },
    {
      id: "ORD-7809",
      customerName: "Sneha Gupta",
      items: [
        { name: "Chicken Biryani", quantity: 2 },
        { name: "Raita", quantity: 2 },
      ],
      status: "Delivered",
      date: "Yesterday, 7:30 PM",
      total: 480,
      timestamp: new Date().getTime() - 86400000, // 1 day ago
    },
    {
      id: "ORD-7798",
      customerName: "Vikram Singh",
      items: [
        { name: "Dal Makhani", quantity: 1 },
        { name: "Butter Naan", quantity: 3 },
      ],
      status: "Delivered",
      date: "Yesterday, 6:15 PM",
      total: 270,
      timestamp: new Date().getTime() - 90000000, // ~1 day ago
    },
    {
      id: "ORD-7785",
      customerName: "Neha Kapoor",
      items: [
        { name: "Paneer Butter Masala", quantity: 1 },
        { name: "Garlic Naan", quantity: 2 },
      ],
      status: "Delivered",
      date: "2 days ago, 8:20 PM",
      total: 310,
      timestamp: new Date().getTime() - 172800000, // 2 days ago
    },
    {
      id: "ORD-7772",
      customerName: "Rajesh Khanna",
      items: [
        { name: "Chicken Tikka", quantity: 2 },
        { name: "Rumali Roti", quantity: 4 },
      ],
      status: "Delivered",
      date: "2 days ago, 7:45 PM",
      total: 420,
      timestamp: new Date().getTime() - 176400000, // ~2 days ago
    },
    {
      id: "ORD-7761",
      customerName: "Ananya Desai",
      items: [
        { name: "Veg Pulao", quantity: 1 },
        { name: "Raita", quantity: 1 },
        { name: "Gulab Jamun", quantity: 2 },
      ],
      status: "Delivered",
      date: "3 days ago, 1:30 PM",
      total: 340,
      timestamp: new Date().getTime() - 259200000, // 3 days ago
    },
  ];

  // State for search, filtering and pagination
  const [searchQuery, setSearchQuery] = useState("");
  const [timeFilter, setTimeFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter data based on search query and time filter
  const filteredData = useMemo(() => {
    return historyItems.filter((item) => {
      // Search filter
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        searchQuery === "" ||
        item.id.toLowerCase().includes(searchLower) ||
        item.customerName.toLowerCase().includes(searchLower) ||
        item.items.some((food) =>
          food.name.toLowerCase().includes(searchLower)
        );

      // Time filter
      let matchesTime = true;
      const now = new Date().getTime();

      if (timeFilter === "today") {
        // Today (last 24 hours)
        matchesTime = now - item.timestamp < 86400000;
      } else if (timeFilter === "week") {
        // This week (last 7 days)
        matchesTime = now - item.timestamp < 604800000;
      } else if (timeFilter === "month") {
        // This month (last 30 days)
        matchesTime = now - item.timestamp < 2592000000;
      }

      return matchesSearch && matchesTime;
    });
  }, [searchQuery, timeFilter, historyItems]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Calculate stats based on filtered data
  const totalOrders = filteredData.length;
  const totalEarnings = filteredData.reduce((sum, item) => sum + item.total, 0);
  const totalItems = filteredData.reduce(
    (sum, item) =>
      sum + item.items.reduce((itemSum, i) => itemSum + i.quantity, 0),
    0
  );

  // Handle pagination
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="flex h-screen flex-col">
      <CookNavBAr />

      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 overflow-auto p-4 md:p-6 bg-gray-50">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Order History</h1>
            <p className="text-sm text-gray-500">View all your past orders</p>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 mb-6 sm:grid-cols-3">
            <div className="rounded-lg bg-white p-4 shadow-sm">
              <h3 className="text-sm font-medium text-gray-500">
                Total Orders
              </h3>
              <p className="mt-2 text-3xl font-bold">{totalOrders}</p>
            </div>
            <div className="rounded-lg bg-white p-4 shadow-sm">
              <h3 className="text-sm font-medium text-gray-500">
                Total Items Sold
              </h3>
              <p className="mt-2 text-3xl font-bold">{totalItems}</p>
            </div>
            <div className="rounded-lg bg-white p-4 shadow-sm">
              <h3 className="text-sm font-medium text-gray-500">
                Total Earnings
              </h3>
              <p className="mt-2 text-3xl font-bold">₹{totalEarnings}</p>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search orders..."
                className="w-full rounded-md border border-gray-300 pl-10 py-2 focus:border-[#426B1F] focus:outline-none focus:ring-1 focus:ring-[#426B1F]"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1); // Reset to first page on search
                }}
              />
            </div>
            <select
              className="rounded-md border border-gray-300 py-2 px-3 focus:border-[#426B1F] focus:outline-none focus:ring-1 focus:ring-[#426B1F]"
              value={timeFilter}
              onChange={(e) => {
                setTimeFilter(e.target.value);
                setCurrentPage(1); // Reset to first page on filter change
              }}
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>

          {/* History Table */}
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
                      Items
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                      Quantity
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
                  {paginatedData.length > 0 ? (
                    paginatedData.map((item) => (
                      <tr key={item.id} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm font-medium">
                          {item.id}
                        </td>
                        <td className="px-4 py-4 text-sm">
                          {item.customerName}
                        </td>
                        <td className="px-4 py-4 text-sm">
                          <div className="space-y-1">
                            {item.items.map((food, index) => (
                              <div key={index}>{food.name}</div>
                            ))}
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm">
                          <div className="space-y-1">
                            {item.items.map((food, index) => (
                              <div key={index}>{food.quantity}</div>
                            ))}
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500">
                          {item.date}
                        </td>
                        <td className="px-4 py-4 text-sm">
                          <span className="inline-flex rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                            {item.status}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-right text-sm font-medium">
                          ₹{item.total}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="7"
                        className="px-4 py-8 text-center text-gray-500"
                      >
                        No orders found matching your search criteria
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between border-t px-4 py-3">
              <div className="text-sm text-gray-500">
                {filteredData.length > 0 ? (
                  <>
                    Showing{" "}
                    <span className="font-medium">{startIndex + 1}</span> to{" "}
                    <span className="font-medium">
                      {Math.min(startIndex + itemsPerPage, filteredData.length)}
                    </span>{" "}
                    of{" "}
                    <span className="font-medium">{filteredData.length}</span>{" "}
                    results
                  </>
                ) : (
                  "No results"
                )}
              </div>
              <div className="flex gap-1">
                <button
                  className={`inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-gray-700 ${
                    currentPage > 1
                      ? "hover:bg-gray-50"
                      : "opacity-50 cursor-not-allowed"
                  }`}
                  onClick={handlePrevPage}
                  disabled={currentPage <= 1}
                >
                  <ChevronLeft className="mr-1 h-4 w-4" />
                  Previous
                </button>
                <button
                  className={`inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-gray-700 ${
                    currentPage < totalPages
                      ? "hover:bg-gray-50"
                      : "opacity-50 cursor-not-allowed"
                  }`}
                  onClick={handleNextPage}
                  disabled={currentPage >= totalPages}
                >
                  Next
                  <ChevronRight className="ml-1 h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
