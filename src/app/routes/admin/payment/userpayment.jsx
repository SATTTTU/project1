import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, CreditCard, DollarSign, Users, Settings } from "lucide-react";
import { Table } from "@/components/ui/tables/tables";

import { TransactionRow } from "@/modules/admin/payment/components/userpaymentdetails";
import { PeriodSelector } from "@/modules/admin/payment/components/periodselector";
import { StatCard } from "@/modules/admin/payment/components/statcard";
import { usePaymentData } from "@/modules/admin/payment/hooks/usePaymentData";
import { Sidebar } from "@/components/ui/admin/aside/aside";
import { FaArrowLeft } from "react-icons/fa";

export const UserPaymentRoute = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("This Month");

  // ✅ Fetch filtered transactions & stats using the updated hook
  const { filteredTransactions, filteredStats, isLoading, isError } = usePaymentData("user", selectedPeriod);

  const columns = ["ID", "Date", "Description", "Amount", "Status", "Actions"];
  const periodOptions = ["Today", "This Week", "This Month", "This Quarter", "This Year"];

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-50 space-y-6">
        
        {/* Header with Period Selector */}
        <div className="flex justify-between items-center p-4 bg-white rounded-xl shadow-md">
          <Link 
            to="/admin/dashboard" 
            className="mr-2 p-1 rounded-full hover:bg-gray-100 text-gray-500 cursor-pointer"
          >
            <FaArrowLeft size={20} />
          </Link>
          <h1 className="text-3xl font-semibold text-gray-800">User Payment Details</h1>
          <PeriodSelector
            selectedPeriod={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            options={periodOptions}
          />
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Revenue"
            value={filteredStats.revenue}
            count={`${filteredTransactions.filter((t) => t.amount.startsWith("+")).length} transactions`}
            icon={<DollarSign size={24} className="text-green-600" />}
            color="green"
          />
          <StatCard
            title="Pending Transactions"
            value={filteredStats.pending}
            count={`${filteredTransactions.filter((t) => t.status === "Processing").length} pending`}
            icon={<CreditCard size={24} className="text-orange-600" />}
            color="orange"
          />

          {/* Payment Settings Card */}
          <Link to="/admin/payment-setting" className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 flex flex-col h-full justify-between">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold text-gray-800">Payment Settings</h3>
                <Settings size={24} className="text-purple-600" />
              </div>
              <div className="mt-4">
                <p className="text-gray-600 text-sm">Configure payment gateways, commissions, and transaction settings</p>
                <div className="flex items-center mt-4 text-purple-600 text-sm font-medium">
                  Configure Settings <ChevronRight size={16} className="ml-1" />
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Transactions Table */}
        <div className="p-4 bg-white rounded-xl shadow-md">
          <h2 className="text-xl font-bold text-gray-800">User Transactions ({selectedPeriod})</h2>

          {/* Loading & Error Handling */}
          {isLoading ? (
            <p className="text-gray-500 text-center py-6">Loading transactions...</p>
          ) : isError ? (
            <p className="text-red-500 text-center py-6">Error loading transactions.</p>
          ) : (
            <Table
              columns={columns}
              data={filteredTransactions}
              renderRow={(tx, index) => <TransactionRow key={index} tx={tx} />}
            />
          )}
        </div>
      </div>
    </div>
  );
};
