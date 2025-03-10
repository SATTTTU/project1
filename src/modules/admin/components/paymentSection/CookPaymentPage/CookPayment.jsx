import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, CreditCard, DollarSign, Users } from "lucide-react";

import { Table } from "../../../../../components/ui/tables/tables";
import { WithdrawalRequestMessage } from "@/components/ui/withdrawalrequest/withdrawalrequest";

export const CookPaymentDetails = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("This Month");
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [withdrawRequests, setWithdrawRequests] = useState([
    {
      id: "1",
      cookId: 1,
      amount: 1200.0,
      user: "Martha",
      email: "marthaa@example.com",
      image: "/api/placeholder/60/60",
      date: "Mar 5, 2025",
      status: "pending",
    },
    {
      id: "2",
      cookId: 3,
      amount: 850.5,
      user: "Samuel",
      email: "sam224@example.com",
      image: "/api/placeholder/60/60",
      date: "Mar 6, 2025",
      status: "pending",
    },
    {
      id: "3",
      cookId: 5,
      amount: 1750.0,
      user: "Cindy",
      email: "cindy@example.com",
      image: "/api/placeholder/60/60",
      date: "Mar 4, 2025",
      status: "pending",
    },
  ]);

  const stats = {
    totalCookPayout: "Rs.45,890.50",
    pendingCookPayments: "Rs.3,750.00",
    cookCount: "320",
  };

  const allTransactions = [
    {
      id: "#PAY-9001",
      date: "Mar 6, 2025",
      cookId: 2,
      description: "Payment to Chef Olivia",
      amount: "-Rs.500.00",
      status: "Completed",
    },
    {
      id: "#PAY-8998",
      date: "Mar 5, 2025",
      cookId: 4,
      description: "Payment to Chef David",
      amount: "-Rs.320.50",
      status: "Completed",
    },
    {
      id: "#PAY-8995",
      date: "Mar 4, 2025",
      cookId: 1,
      description: "Bonus to Chef Martha",
      amount: "-Rs.150.75",
      status: "Completed",
    },
    {
      id: "#PAY-8990",
      date: "Feb 28, 2025",
      cookId: 3,
      description: "Payment to Chef Samuel",
      amount: "-Rs.800.00",
      status: "Completed",
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

  const handleApprove = (id) => {
    setWithdrawRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, status: "processing" } : req
      )
    );

    const request = withdrawRequests.find((req) => req.id === id);
    if (request) {
      const newTransaction = {
        id: `#PAY-${9000 + Math.floor(Math.random() * 100)}`,
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        cookId: request.cookId,
        description: `Payment to Chef ${request.user}`,
        amount: `-Rs.${request.amount.toFixed(2)}`,
        status: "Processing",
      };
      setFilteredTransactions((prev) => [newTransaction, ...prev]);
    }
  };

  const handleReject = (id) => {
    setWithdrawRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: "rejected" } : req))
    );
  };

  const handleArchive = (id) => {
    setWithdrawRequests((prev) => prev.filter((req) => req.id !== id));
  };

  const transactionColumns = ["ID", "Date", "Chef", "Amount", "Status"];

  const renderTransactionRow = (transaction, index) => (
    <tr key={index}>
      <td className="px-6 py-4 text-sm text-gray-900">{transaction.id}</td>
      <td className="px-6 py-4 text-sm text-gray-500">{transaction.date}</td>
      <td className="px-6 py-4 text-sm text-gray-900">
        <Link
          to={`/cook-profile/${transaction.cookId}`}
          className="text-blue-600 hover:underline"
        >
          {transaction.description
            .replace("Payment to ", "")
            .replace("Bonus to ", "")}
        </Link>
      </td>
      <td className="px-6 py-4 text-sm text-red-600">{transaction.amount}</td>
      <td className="px-6 py-4 text-sm">
        <span
          className={`px-2 py-1 rounded-md text-xs ${
            transaction.status === "Completed"
              ? "bg-green-100 text-green-800"
              : "bg-blue-100 text-blue-800"
          }`}
        >
          {transaction.status}
        </span>
      </td>
    </tr>
  );

  return (
    <section className="flex h-screen bg-gray-50">
      <div className="md:w-1/5 bg-white shadow-md">
        <Sidebar />
      </div>

      <div className="md:w-4/5 p-6 overflow-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Cook Payment Management
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                <DollarSign size={20} />
              </div>
              <div>
                <h2 className="text-sm font-medium text-gray-500">
                  Total Payouts
                </h2>
                <p className="text-xl font-bold text-gray-800">
                  {stats.totalCookPayout}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100 text-yellow-600 mr-4">
                <CreditCard size={20} />
              </div>
              <div>
                <h2 className="text-sm font-medium text-gray-500">
                  Pending Payments
                </h2>
                <p className="text-xl font-bold text-gray-800">
                  {stats.pendingCookPayments}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                <Users size={20} />
              </div>
              <div>
                <h2 className="text-sm font-medium text-gray-500">
                  Total Cooks
                </h2>
                <p className="text-xl font-bold text-gray-800">
                  {stats.cookCount}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end mb-4">
          <div className="flex items-center space-x-2">
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
        </div>

        {/* Withdrawal Requests Section */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">
            Pending Withdrawal Requests
          </h3>

          {withdrawRequests.length > 0 ? (
            <div className="space-y-4">
              {withdrawRequests.map((request) => (
                <WithdrawalRequestMessage
                  key={request.id}
                  request={request}
                  onApprove={handleApprove}
                  onReject={handleReject}
                  onArchive={handleArchive}
                />
              ))}
            </div>
          ) : (
            <div className="p-6 text-center text-gray-500 bg-white rounded-lg border border-gray-100">
              No pending withdrawal requests
            </div>
          )}
        </div>

        {/* Transaction History Table */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">
            Transaction History
          </h3>
          <Table
            columns={transactionColumns}
            data={filteredTransactions}
            renderRow={renderTransactionRow}
          />
        </div>
      </div>
    </section>
  );
};
