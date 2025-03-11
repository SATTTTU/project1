// pages/UserPaymentDetails.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, CreditCard, DollarSign, Users } from 'lucide-react';
import { Table } from '@/components/ui/tables/tables';
import { usePaymentData } from '../hooks/usePaymentData';
import { StatCard } from './statcard';
import { PeriodSelector } from './periodselector';
export const UserPaymentDetails = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('This Month');
  const { filteredTransactions, filteredStats, stats } = usePaymentData('user', selectedPeriod);

  const columns = ['ID', 'Date', 'Description', 'Amount', 'Status', 'Actions'];
  const periodOptions = ['Today', 'This Week', 'This Month', 'This Quarter', 'This Year'];

  const getStatusStyle = (status) => {
    const styles = {
      'Completed': 'bg-green-100 text-green-800',
      'Processing': 'bg-blue-100 text-blue-800',
      'Failed': 'bg-red-100 text-red-800'
    };
    return styles[status] || 'bg-gray-100 text-gray-800';
  };

  const renderTransactionRow = (tx, index) => (
    <tr key={index}>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{tx.id}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tx.date}</td>
      <td className="px-6 py-4 text-sm text-gray-500">{tx.description}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium" 
          style={{ color: tx.amount.startsWith('+') ? '#16A34A' : '#DC2626' }}>
        {tx.amount}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2 py-1 text-xs rounded-full ${getStatusStyle(tx.status)}`}>
          {tx.status}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <button className="text-blue-600 hover:text-blue-800 mr-3">View</button>
      </td>
    </tr>
  );

  const ManagementLink = ({ path, title, description, action, color }) => (
    <Link to={path} className={`block p-6 bg-white shadow-md rounded-xl hover:shadow-lg transition border-l-4 border-${color}-500`}>
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <CreditCard size={20} className={`text-${color}-600`} />
      </div>
      <p className="text-gray-600 mb-3">{description}</p>
      <div className={`flex items-center text-${color}-600 text-sm font-medium`}>
        {action} <ChevronRight size={16} />
      </div>
    </Link>
  );

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">User Payment Details</h1>
        <PeriodSelector
          selectedPeriod={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          options={periodOptions}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatCard
          title={`User Revenue (${selectedPeriod})`}
          value={filteredStats.revenue}
          count={`${filteredTransactions.filter(t => t.amount.startsWith('+')).length} transactions`}
          icon={<DollarSign size={20} className="text-green-600" />}
          color="green"
        />
        <StatCard
          title={`Pending User Payments (${selectedPeriod})`}
          value={filteredStats.pending}
          count={`${filteredTransactions.filter(t => t.status === 'Processing').length} transactions pending`}
          icon={<CreditCard size={20} className="text-orange-600" />}
          color="orange"
        />
        <StatCard
          title="Total Users"
          value={stats.userCount}
          count="+24 new this week"
          icon={<Users size={20} className="text-blue-600" />}
          color="blue"
        />
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">User Transactions ({selectedPeriod})</h2>
          <Link to="/admin/all-user-transactions" className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
            View All <ChevronRight size={16} />
          </Link>
        </div>
        <Table columns={columns} data={filteredTransactions} renderRow={renderTransactionRow} />
      </div>

      <h2 className="text-xl font-bold text-gray-800 mb-4">User Payment Management</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ManagementLink
          path="/admin/user-invoices"
          title="User Invoices"
          description="Generate and manage user payment invoices."
          action="Manage Invoices"
          color="green"
        />
        <ManagementLink
          path="/admin/payment-setting"
          title="User Payment Settings"
          description="Configure user payment methods and options."
          action="Adjust Settings"
          color="gray"
        />
      </div>
      </>
  );
};