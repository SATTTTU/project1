// pages/CookPaymentDetails.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DollarSign, CreditCard, Users } from 'lucide-react';
import { Table } from '@/components/ui/tables/tables';
import { WithdrawalRequestMessage } from '@/components/ui/withdrawalrequest/withdrawalrequest';
import { StatCard } from './statcard';
import { PeriodSelector } from './periodselector';
import { usePaymentData } from '../hooks/usePaymentData';

export const CookPaymentDetails = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('This Month');
  const { 
    filteredTransactions, 
    withdrawRequests, 
    stats,
    handleApprove, 
    handleReject, 
    handleArchive 
  } = usePaymentData('cook', selectedPeriod);

  const periodOptions = ['This Month', 'This Year'];
  const transactionColumns = ['ID', 'Date', 'Chef', 'Amount', 'Status'];

  const renderTransactionRow = (transaction, index) => (
    <tr key={index}>
      <td className="px-6 py-4 text-sm text-gray-900">{transaction.id}</td>
      <td className="px-6 py-4 text-sm text-gray-500">{transaction.date}</td>
      <td className="px-6 py-4 text-sm text-gray-900">
        <Link to={`/cook-profile/${transaction.cookId}`} className="text-blue-600 hover:underline">
          {transaction.description.replace('Payment to ', '').replace('Bonus to ', '')}
        </Link>
      </td>
      <td className="px-6 py-4 text-sm text-red-600">{transaction.amount}</td>
      <td className="px-6 py-4 text-sm">
        <span
          className={`px-2 py-1 rounded-md text-xs ${
            transaction.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
          }`}
        >
          {transaction.status}
        </span>
      </td>
    </tr>
  );

  return (
    <>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Cook Payment Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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

      <div className="flex justify-end mb-4">
        <PeriodSelector
          selectedPeriod={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          options={periodOptions}
        />
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Pending Withdrawal Requests</h3>
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

      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Transaction History</h3>
        <Table columns={transactionColumns} data={filteredTransactions} renderRow={renderTransactionRow} />
      </div>
    </>

  );
};