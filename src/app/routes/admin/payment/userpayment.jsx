import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, CreditCard, DollarSign, Settings } from "lucide-react";
import { FaArrowLeft } from "react-icons/fa";
import { Sidebar } from "@/components/ui/admin/aside/aside";
import { Usegettotalearning } from "@/modules/admin/payment/api/gettotalearning";
import { useGetAllWithdrawRequests } from "@/modules/admin/payment/api/getWithdrawRequest";

export const UserPaymentRoute = () => {
  const { data: earningsData, isLoading: earningsLoading, error: earningsError } = Usegettotalearning();
  const { data: transactionsData = { message: "", requests: [] } } = useGetAllWithdrawRequests();

  // Make sure we're accessing the correct structure from your data
  const requests = transactionsData|| [];
  console.log('first',requests)
  
  const formattedEarnings =
    earningsLoading || earningsError
      ? "Loading..."
      : `Rs${earningsData?.totalEarnings?.toLocaleString() || "0"}`;
  
      const totalTransactionAmount = Array.isArray(requests)
      ? requests.reduce((total, transaction) => {
          return total + parseFloat(transaction.amount || 0);
        }, 0)
      : 0;
  
  // Format the total amount to currency format
  const formattedTransactionAmount = `Rs${totalTransactionAmount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
  
  // Get the count of transactions
  const transactionCount = requests.length;
  
  const [selectedPeriod, setSelectedPeriod] = useState("This Month");
  const periodOptions = ["Today", "This Week", "This Month", "This Quarter", "This Year"];

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <div className="w-64 bg-white shadow-md">
        <Sidebar/>
      </div>

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
          {/* Placeholder Stat Cards */}
          <SimplifiedStatCard
            title="Total Revenue"
            value={formattedEarnings}
            icon={<DollarSign size={24} className="text-green-600" />}
            color="green"
          />
          <SimplifiedStatCard
            title="Pending Transactions"
            value={formattedTransactionAmount}
            count={`${transactionCount} pending`}
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


        {/* Transactions Section - Just the Button */}
        <div className="p-4 bg-white rounded-xl shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-4">User Transactions ({selectedPeriod})</h2>
          
          <div className="flex justify-center py-4">
            <Link to="https://test-admin.khalti.com/#/transaction?search_type&search_value&state=DhvMj9hdRufLqkP8ZY4d8g&type&start_date=2025-04-04&end_date=2025-04-07&live=true&page=1" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              View Transaction Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// Simplified components without data dependencies

const PeriodSelector = ({ selectedPeriod, onChange, options }) => (
  <div className="flex items-center space-x-2 relative">
    <span className="text-gray-500">Period:</span>
    <div className="relative">
      <select
        className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={selectedPeriod}
        onChange={onChange}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronRight className="absolute right-2 top-3 text-gray-500 pointer-events-none rotate-90" size={16} />
    </div>
  </div>
);

const SimplifiedStatCard = ({ title, value, count, icon, color }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
    <div className="flex items-center justify-between mb-4">
      <div className="text-sm font-medium text-gray-500">{title}</div>
      <div className={`p-2 rounded-lg bg-${color}-100`}>
        {icon}
      </div>
    </div>
    <div className="text-2xl font-bold text-gray-800">{value}</div>
    {count && <div className={`text-sm text-${color}-500 mt-2`}>{count}</div>}
  </div>
);