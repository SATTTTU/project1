import React from "react";
import { useState } from "react";

import { Sidebar } from "../../../../components/ui/sideBar/sidebar";
import { FiMenu } from "react-icons/fi";
import { FaArrowRight, FaBell, FaDownload, FaUser } from "react-icons/fa";

export const EarningsPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState("month");

  // Sample earnings data
  const earningsData = {
    total: 45680,
    available: 12580,
    pending: 3200,
    monthlyEarnings: [
      { month: "Jan", amount: 3800 },
      { month: "Feb", amount: 4200 },
      { month: "Mar", amount: 3900 },
      { month: "Apr", amount: 4500 },
      { month: "May", amount: 5100 },
      { month: "Jun", amount: 4800 },
      { month: "Jul", amount: 5200 },
      { month: "Aug", amount: 4900 },
      { month: "Sep", amount: 5300 },
      { month: "Oct", amount: 5600 },
      { month: "Nov", amount: 0 },
      { month: "Dec", amount: 0 },
    ],
    recentTransactions: [
      {
        id: "TXN-7829",
        type: "Order Payment",
        amount: 350,
        status: "Completed",
        date: "Today, 2:30 PM",
      },
      {
        id: "TXN-7823",
        type: "Order Payment",
        amount: 280,
        status: "Completed",
        date: "Today, 1:15 PM",
      },
      {
        id: "TXN-7814",
        type: "Order Payment",
        amount: 220,
        status: "Completed",
        date: "Today, 12:45 PM",
      },
      {
        id: "TXN-7809",
        type: "Order Payment",
        amount: 480,
        status: "Completed",
        date: "Yesterday, 7:30 PM",
      },
      {
        id: "TXN-7798",
        type: "Withdrawal",
        amount: -5000,
        status: "Completed",
        date: "15 Oct, 2023",
      },
    ],
  };

  // Calculate max value for chart scaling
  const maxEarning = Math.max(
    ...earningsData.monthlyEarnings.map((item) => item.amount)
  );

  return (
    <div className="flex h-screen flex-col">
      {/* Header */}
      <header className="flex h-16 items-center justify-between  px-4 md:px-6 bg-white">
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
            <span className="absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-[#426B1F] text-xs text-white">
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
        <Sidebar />
        {/* Main content */}
        <main className="flex-1 overflow-auto p-4 md:p-6 bg-gray-50">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Earnings</h1>
            <p className="text-sm text-gray-500">
              Track your income and withdrawals
            </p>
          </div>

          {/* Earnings Summary */}
          <div className="grid gap-4 mb-8 sm:grid-cols-3">
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h3 className="text-sm font-medium text-gray-500">
                Total Earnings
              </h3>
              <p className="mt-2 text-3xl font-bold">
                ₹{earningsData.total.toLocaleString()}
              </p>
              <p className="mt-1 text-sm text-gray-500">Lifetime earnings</p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h3 className="text-sm font-medium text-gray-500">
                Available for Withdrawal
              </h3>
              <p className="mt-2 text-3xl font-bold">
                ₹{earningsData.available.toLocaleString()}
              </p>
              <button className="mt-3 flex items-center text-sm font-medium text-[#426B1F]">
                Withdraw Funds
                <FaArrowRight className="ml-1 h-4 w-4" />
              </button>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h3 className="text-sm font-medium text-gray-500">
                Pending Clearance
              </h3>
              <p className="mt-2 text-3xl font-bold">
                ₹{earningsData.pending.toLocaleString()}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Available in 3-5 days
              </p>
            </div>
          </div>

          {/* Earnings Chart */}
          <div className="mb-8 rounded-lg bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-medium">Earnings Overview</h3>
              <div className="flex items-center space-x-2">
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="rounded-md border border-gray-300 py-1 px-2 text-sm focus:border-[#426B1F] focus:outline-none focus:ring-1 focus:ring-[#426B1F]"
                >
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="year">This Year</option>
                </select>
                <button className="rounded-md border border-gray-300 p-1">
                  <FaDownload className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="h-64">
              <div className="flex h-full items-end space-x-2">
                {earningsData.monthlyEarnings.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-1 flex-col items-center"
                  >
                    <div
                      className="w-full bg-[#426B1F]/80 rounded-t"
                      style={{
                        height: `${(item.amount / maxEarning) * 100}%`,
                        minHeight: item.amount > 0 ? "4px" : "0",
                      }}
                    ></div>
                    <div className="mt-2 text-xs">{item.month}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="rounded-lg bg-white shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b">
              <h3 className="text-lg font-medium">Recent Transactions</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                      Transaction ID
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {earningsData.recentTransactions.map((transaction) => (
                    <tr
                      key={transaction.id}
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 text-sm font-medium">
                        {transaction.id}
                      </td>
                      <td className="px-6 py-4 text-sm">{transaction.type}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {transaction.date}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span className="inline-flex rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                          {transaction.status}
                        </span>
                      </td>
                      <td
                        className={`px-6 py-4 text-right text-sm font-medium ${
                          transaction.amount < 0
                            ? "text-red-600"
                            : "text-green-600"
                        }`}
                      >
                        {transaction.amount < 0 ? "-" : "+"}₹
                        {Math.abs(transaction.amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 border-t">
              <button className="text-sm font-medium text-[#426B1F]">
                View All Transactions
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
