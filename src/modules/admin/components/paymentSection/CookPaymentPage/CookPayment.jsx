import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, CreditCard, DollarSign, Users } from "lucide-react";
import { Sidebar } from "../../Homepage/aside/aside";

export const CookPaymentDetails = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("This Month");
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [selectedCook, setSelectedCook] = useState(null);

  const stats = {
    totalCookPayout: "Rs.45,890.50",
    pendingCookPayments: "3,750.00",
    cookCount: "320",
  };

  const allTransactions = [
    {
      id: "#PAY-9001",
      date: "Mar 6, 2025",
      description: "Payment to Chef A",
      amount: "-Rs500.00",
      status: "Completed",
    },
    {
      id: "#PAY-8998",
      date: "Mar 5, 2025",
      description: "Payment to Chef B",
      amount: "-Rs320.50",
      status: "Completed",
    },
    {
      id: "#PAY-8995",
      date: "Mar 4, 2025",
      description: "Bonus to Chef C",
      amount: "-Rs150.75",
      status: "Completed",
    },
    {
      id: "#PAY-8990",
      date: "Feb 28, 2025",
      description: "Pending payment to Chef D",
      amount: "-Rs800.00",
      status: "Processing",
    },
  ];

  const topCooks = [
    {
      id: 1,
      name: "Martha",
      email: "marthaa@example.com",
      image: "/api/placeholder/60/60",
    },
    {
      id: 2,
      name: "Olivia",
      email: "oliv62@example.com",
      image: "/api/placeholder/60/60",
    },
    {
      id: 3,
      name: "Samuel",
      email: "sam224@example.com",
      image: "/api/placeholder/60/60",
    },
    {
      id: 4,
      name: "David",
      email: "davidxc@example.com",
      image: "/api/placeholder/60/60",
    },
    {
      id: 5,
      name: "Cindy",
      email: "cindy@example.com",
      image: "/api/placeholder/60/60",
    },
  ];

  useEffect(() => {
    const currentDate = new Date();
    let filteredData = allTransactions.filter((tx) => {
      const txDate = new Date(tx.date);
      return selectedPeriod === "This Month"
        ? txDate.getMonth() === currentDate.getMonth()
        : true;
    });
    setFilteredTransactions(filteredData);
  }, [selectedPeriod]);

  const handleTransferNow = () => {
    if (!withdrawAmount || !selectedCook) return;

    // Here you would handle the actual transfer logic
    alert(`Transferring Rs{withdrawAmount} to Rs{selectedCook.name}`);

    // Reset form
    setWithdrawAmount("");
    setSelectedCook(null);
  };

  return (
    <section className="flex h-screen bg-gray-50">
      <div className="md:w-1/5 bg-white shadow-md">
        <Sidebar />
      </div>

      <div className="md:w-4/5 p-6 overflow-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Cook Payment Details
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Left side - Transaction details */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2 mb-6">
              <span className="text-gray-500">Period:</span>
              <select
                className="bg-white border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
              >
                <option>This Month</option>
                <option>This Year</option>
              </select>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-sm font-medium text-gray-500">
                  Total Cook Payouts
                </h2>
                <p className="text-2xl font-bold text-gray-800">
                  {stats.totalCookPayout}
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-sm font-medium text-gray-500">
                  Pending Payments
                </h2>
                <p className="text-2xl font-bold text-gray-800">
                  {stats.pendingCookPayments}
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-sm font-medium text-gray-500">
                  Total Cooks
                </h2>
                <p className="text-2xl font-bold text-gray-800">
                  {stats.cookCount}
                </p>
              </div>
            </div>
          </div>

          {/* Right side - Quick Transfer */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                Quick Transfer
              </h2>
              <p className="text-2xl font-bold">Rs56,772.38</p>
            </div>
            <p className="text-gray-500 text-sm mb-6">
              Select a cook to transfer payment
            </p>

            <div className="flex space-x-3 overflow-x-auto pb-4 mb-6">
              {topCooks.map((cook) => (
                <div
                  key={cook.id}
                  className={`flex flex-col items-center space-y-2 min-w-16 cursor-pointer p-2 rounded-lg Rs{selectedCook?.id === cook.id ? 'bg-blue-100 ring-2 ring-blue-500' : 'hover:bg-gray-100'}`}
                  onClick={() => setSelectedCook(cook)}
                >
                  <div className="relative">
                    <img
                      src={cook.image}
                      alt={cook.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    {selectedCook?.id === cook.id && (
                      <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white rounded-full p-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3 w-3"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                  <span className="text-sm font-medium text-gray-900 truncate max-w-16">
                    {cook.name}
                  </span>
                  <span className="text-xs text-gray-500 truncate max-w-16">
                    {cook.email.substring(0, 8)}
                  </span>
                </div>
              ))}
            </div>

            <div className="mb-6">
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Amount
              </label>
              <input
                type="text"
                id="amount"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <button
              onClick={handleTransferNow}
              disabled={!withdrawAmount || !selectedCook}
              className={`w-full py-3 px-4 rounded-md text-white font-medium Rs{
                withdrawAmount && selectedCook ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-300 cursor-not-allowed'
              }`}
            >
              TRANSFER NOW
            </button>
          </div>
        </div>

        {/* Transaction History Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-800">
              Transaction History
            </h3>
          </div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {transaction.id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {transaction.date}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {transaction.description}
                    </td>
                    <td className="px-6 py-4 text-sm text-red-600">
                      {transaction.amount}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {transaction.status}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    No transactions found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
