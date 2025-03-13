import React, { useState } from "react";
import { DollarSign, CreditCard, Users, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

// Component imports
import { PeriodSelector } from "@/modules/admin/payment/components/periodselector";
import { usePaymentData } from "@/modules/admin/payment/hooks/usePaymentData";
import { WithdrawalRequestMessage } from "@/components/ui/withdrawalrequest/withdrawalrequest";
import { CookTransactionTable } from "@/modules/admin/payment/components/cookpaymentdetails";
import { StatCard } from "@/modules/admin/payment/components/statcard";
import { Sidebar } from "@/components/ui/admin/aside/aside";

export const CookPaymentRoute = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("This Month");
  const { 
    filteredTransactions, 
    withdrawRequests, 
    stats, 
    handleApprove, 
    handleReject, 
    handleArchive 
  } = usePaymentData("cook", selectedPeriod);
  
  const periodOptions = ["This Month", "This Year"];
  
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 h-full shadow-lg">
        <Sidebar />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header with Back Button */}
          <div className="flex items-center mb-6">
            <Link 
              to="/admin/dashboard" 
              className="p-2 mr-3 rounded-full hover:bg-gray-200 transition-colors duration-200"
            >
              <ArrowLeft size={20} className="text-gray-600" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-800">Cook Payment Management</h1>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            <StatCard
              title="Total Payouts"
              value={stats.totalCookPayout}
              icon={<DollarSign size={20} className="text-blue-600" />}
              color="blue"
            />
            <StatCard
              title="Pending Payments"
              value={stats.pendingCookPayments}
              icon={<CreditCard size={20} className="text-yellow-600" />}
              color="yellow"
            />
            <StatCard
              title="Total Cooks"
              value={stats.cookCount}
              icon={<Users size={20} className="text-green-600" />}
              color="green"
            />
          </div>
          
          {/* Period Selector and Dashboard Sections */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-700">Withdrawal Requests</h2>
              <PeriodSelector
                selectedPeriod={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                options={periodOptions}
              />
            </div>
            
            {/* Pending Withdrawals */}
            {withdrawRequests.length > 0 ? (
              <div className="space-y-4 mb-8">
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
              <div className="p-6 text-center bg-white rounded-lg shadow-sm border border-gray-100 mb-8">
                <p className="text-gray-500">No pending withdrawal requests</p>
              </div>
            )}
            
            {/* Transaction History */}
            <div>
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Transaction History</h2>
              <CookTransactionTable transactions={filteredTransactions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};