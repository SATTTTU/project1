import React, { useState, useMemo } from "react";
import { Sidebar } from "../../../../components/ui/sideBar/sidebar";
import { FaArrowRight, FaDownload, FaArrowLeft } from "react-icons/fa";
import CookNavBAr from "../../../../components/ui/cooknavbar/cooknavbar";

export const EarningsPage = () => {
  // States for various functionalities
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [showAllTransactions, setShowAllTransactions] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawMethod, setWithdrawMethod] = useState("bank");

  // Sample earnings data with daily, weekly, monthly, and yearly breakdowns
  const earningsData = {
    total: 45680,
    available: 12580,
    pending: 3200,

    dailyEarnings: [
      { day: "Mon", amount: 980 },
      { day: "Tue", amount: 1150 },
      { day: "Wed", amount: 860 },
      { day: "Thu", amount: 1200 },
      { day: "Fri", amount: 1350 },
      { day: "Sat", amount: 1600 },
      { day: "Sun", amount: 1400 },
    ],

    weeklyEarnings: [
      { week: "Week 1", amount: 5200 },
      { week: "Week 2", amount: 4800 },
      { week: "Week 3", amount: 5500 },
      { week: "Week 4", amount: 6200 },
    ],

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

    // Expanded transactions list for "View All" functionality
    allTransactions: [
      {
        id: "TXN-7829",
        type: "Order Payment",
        amount: 350,
        status: "Completed",
        date: "Today, 2:30 PM",
        customer: "Rahul Sharma",
      },
      {
        id: "TXN-7823",
        type: "Order Payment",
        amount: 280,
        status: "Completed",
        date: "Today, 1:15 PM",
        customer: "Priya Patel",
      },
      {
        id: "TXN-7814",
        type: "Order Payment",
        amount: 220,
        status: "Completed",
        date: "Today, 12:45 PM",
        customer: "Amit Kumar",
      },
      {
        id: "TXN-7809",
        type: "Order Payment",
        amount: 480,
        status: "Completed",
        date: "Yesterday, 7:30 PM",
        customer: "Sneha Gupta",
      },
      {
        id: "TXN-7798",
        type: "Withdrawal",
        amount: -5000,
        status: "Completed",
        date: "15 Oct, 2023",
        method: "Bank Transfer",
      },
      {
        id: "TXN-7760",
        type: "Order Payment",
        amount: 350,
        status: "Completed",
        date: "14 Oct, 2023",
        customer: "Vikram Singh",
      },
      {
        id: "TXN-7742",
        type: "Order Payment",
        amount: 520,
        status: "Completed",
        date: "13 Oct, 2023",
        customer: "Neha Kapoor",
      },
      {
        id: "TXN-7733",
        type: "Order Payment",
        amount: 180,
        status: "Completed",
        date: "12 Oct, 2023",
        customer: "Rajesh Khanna",
      },
      {
        id: "TXN-7724",
        type: "Order Payment",
        amount: 450,
        status: "Completed",
        date: "10 Oct, 2023",
        customer: "Ananya Desai",
      },
      {
        id: "TXN-7712",
        type: "Withdrawal",
        amount: -3000,
        status: "Completed",
        date: "8 Oct, 2023",
        method: "UPI",
      },
    ],
  };

  // Get chart data based on selected period
  const chartData = useMemo(() => {
    switch (selectedPeriod) {
      case "day":
        return earningsData.dailyEarnings;
      case "week":
        return earningsData.weeklyEarnings;
      case "year":
        return earningsData.monthlyEarnings;
      case "month":
      default:
        // Show only current month's weekly breakdown for "month" view
        return earningsData.weeklyEarnings;
    }
  }, [selectedPeriod]);

  // Calculate max value for chart scaling
  const maxEarning = useMemo(
    () => Math.max(...chartData.map((item) => item.amount)),
    [chartData]
  );

  // Decide which transactions to show based on showAllTransactions
  const transactionsToShow = useMemo(
    () =>
      showAllTransactions
        ? earningsData.allTransactions
        : earningsData.allTransactions.slice(0, 5),
    [showAllTransactions]
  );

  // Handle withdrawal form submission
  const handleWithdraw = (e) => {
    e.preventDefault();
    // In a real app, you'd make an API call here
    alert(
      `Withdrawal of ₹${withdrawAmount} initiated to ${
        withdrawMethod === "bank" ? "Bank Account" : "UPI"
      }`
    );
    setShowWithdrawModal(false);
    setWithdrawAmount("");
  };

  // Get X-axis label based on period
  const getXAxisLabel = (item) => {
    switch (selectedPeriod) {
      case "day":
        return item.day;
      case "week":
        return item.week;
      case "year":
        return item.month;
      case "month":
      default:
        return item.week;
    }
  };

  return (
    <div className="flex h-screen flex-col">
      <CookNavBAr />

      <div className="flex flex-1 overflow-hidden">
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
              <button
                className="mt-3 flex items-center text-sm font-medium text-[#426B1F] hover:text-[#2d4a15]"
                onClick={() => setShowWithdrawModal(true)}
              >
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
                  <option value="day">Daily</option>
                  <option value="week">Weekly</option>
                  <option value="month">Monthly</option>
                  <option value="year">Yearly</option>
                </select>
                <button className="rounded-md border border-gray-300 p-1 hover:bg-gray-50">
                  <FaDownload className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="h-64">
              <div className="flex h-full items-end space-x-2">
                {chartData.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-1 flex-col items-center group relative"
                  >
                    <div
                      className="w-full bg-[#426B1F]/80 rounded-t hover:bg-[#426B1F] transition-all duration-200"
                      style={{
                        height: `${(item.amount / maxEarning) * 100}%`,
                        minHeight: item.amount > 0 ? "4px" : "0",
                      }}
                    ></div>

                    {/* Tooltip on hover */}
                    <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 bg-gray-800 text-white py-1 px-2 rounded text-xs pointer-events-none transition-opacity">
                      ₹{item.amount.toLocaleString()}
                    </div>

                    <div className="mt-2 text-xs">{getXAxisLabel(item)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Transactions */}
          <div className="rounded-lg bg-white shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-medium">
                {showAllTransactions
                  ? "All Transactions"
                  : "Recent Transactions"}
              </h3>
              {showAllTransactions && (
                <button
                  className="flex items-center text-sm font-medium text-[#426B1F]"
                  onClick={() => setShowAllTransactions(false)}
                >
                  <FaArrowLeft className="mr-1 h-4 w-4" />
                  Back to Recent
                </button>
              )}
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
                      {showAllTransactions ? "Customer/Method" : "Status"}
                    </th>
                    <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {transactionsToShow.map((transaction) => (
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
                        {showAllTransactions ? (
                          transaction.customer || transaction.method
                        ) : (
                          <span className="inline-flex rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                            {transaction.status}
                          </span>
                        )}
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

            {!showAllTransactions && (
              <div className="px-6 py-4 border-t">
                <button
                  className="text-sm font-medium text-[#426B1F] hover:text-[#2d4a15]"
                  onClick={() => setShowAllTransactions(true)}
                >
                  View All Transactions
                </button>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Withdraw Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-xs transition bg-opacity-100 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Withdraw Funds</h2>
            <form onSubmit={handleWithdraw}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Available for withdrawal
                </label>
                <p className="text-2xl font-bold mb-2">
                  ₹{earningsData.available.toLocaleString()}
                </p>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Withdrawal Amount
                </label>
                <input
                  type="number"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  min="100"
                  max={earningsData.available}
                  className="w-full rounded-md border border-gray-300 py-2 px-3 focus:border-[#426B1F] focus:outline-none focus:ring-1 focus:ring-[#426B1F]"
                  placeholder="Enter amount"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Minimum withdrawal: ₹100
                </p>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Withdrawal Method
                </label>
                <select
                  value={withdrawMethod}
                  onChange={(e) => setWithdrawMethod(e.target.value)}
                  className="w-full rounded-md border border-gray-300 py-2 px-3 focus:border-[#426B1F] focus:outline-none focus:ring-1 focus:ring-[#426B1F]"
                  required
                >
                  <option value="bank">Bank Transfer</option>
                  <option value="upi">UPI</option>
                </select>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowWithdrawModal(false)}
                  className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-[#426B1F] px-4 py-2 text-sm font-medium text-white hover:bg-[#2d4a15] focus:outline-none focus:ring-2 focus:ring-[#426B1F]"
                  disabled={
                    !withdrawAmount ||
                    Number(withdrawAmount) < 100 ||
                    Number(withdrawAmount) > earningsData.available
                  }
                >
                  Withdraw Funds
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
