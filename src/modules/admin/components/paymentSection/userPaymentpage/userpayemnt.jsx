import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, CreditCard, DollarSign, Users } from 'lucide-react';
import { Sidebar } from '../../homepage/aside/aside';

export const UserPaymentDetails = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('This Month');
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  
  // Mock stats for demo - focused on user payments only, removed subscription data
  const stats = {
    totalUserRevenue: 'Rs.32,450.75',
    pendingUserPayments: '2,180.00',
    userCount: '1,245'
  };
  
  // Mock user payment transactions
  const allTransactions = [
    {
      id: '#TRX-8752',
      date: 'Mar 6, 2025',
      description: 'One-time payment from John Doe',
      amount: '+$149.99',
      status: 'Completed'
    },
    {
      id: '#TRX-8750',
      date: 'Mar 5, 2025',
      description: 'One-time payment from Sarah Johnson',
      amount: '+$89.50',
      status: 'Completed'
    },
    {
      id: '#TRX-8745',
      date: 'Mar 4, 2025',
      description: 'One-time meal purchase from Michael Brown',
      amount: '+$35.75',
      status: 'Completed'
    },
    {
      id: '#TRX-8742',
      date: 'Feb 28, 2025',
      description: 'Payment from Emily Davis',
      amount: '+$149.99',
      status: 'Processing'
    },
    {
      id: '#TRX-8735',
      date: 'Feb 20, 2025',
      description: 'Refund to Robert Wilson',
      amount: '-$89.50',
      status: 'Completed'
    },
    {
      id: '#TRX-8730',
      date: 'Feb 15, 2025',
      description: 'Payment from Jessica Taylor',
      amount: '+$75.25',
      status: 'Completed'
    },
    {
      id: '#TRX-8725',
      date: 'Jan 30, 2025',
      description: 'Payment from David Miller',
      amount: '+$120.00',
      status: 'Completed'
    },
    {
      id: '#TRX-8720',
      date: 'Jan 15, 2025',
      description: 'Payment from Lisa Anderson',
      amount: '+$95.50',
      status: 'Completed'
    }
  ];
  
  // Filter transactions based on selected time period
  useEffect(() => {
    const currentDate = new Date();
    let filteredData = [];
    
    switch(selectedPeriod) {
      case 'Today':
        const today = currentDate.toDateString();
        filteredData = allTransactions.filter(tx => {
          const txDate = new Date(tx.date).toDateString();
          return txDate === today;
        });
        break;
      case 'This Week':
        const weekStart = new Date(currentDate);
        weekStart.setDate(currentDate.getDate() - currentDate.getDay());
        filteredData = allTransactions.filter(tx => {
          const txDate = new Date(tx.date);
          return txDate >= weekStart;
        });
        break;
      case 'This Month':
        const monthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        filteredData = allTransactions.filter(tx => {
          const txDate = new Date(tx.date);
          return txDate >= monthStart;
        });
        break;
      case 'This Quarter':
        const quarterStart = new Date(currentDate);
        quarterStart.setMonth(Math.floor(currentDate.getMonth() / 3) * 3, 1);
        filteredData = allTransactions.filter(tx => {
          const txDate = new Date(tx.date);
          return txDate >= quarterStart;
        });
        break;
      case 'This Year':
        const yearStart = new Date(currentDate.getFullYear(), 0, 1);
        filteredData = allTransactions.filter(tx => {
          const txDate = new Date(tx.date);
          return txDate >= yearStart;
        });
        break;
      default:
        filteredData = allTransactions;
    }
    
    setFilteredTransactions(filteredData);
  }, [selectedPeriod]);
  
  // Calculate stats based on filtered transactions
  const calculateFilteredStats = () => {
    let revenue = 0;
    let pendingAmount = 0;
    
    filteredTransactions.forEach(tx => {
      const amount = parseFloat(tx.amount.replace(/[+$,]/g, ''));
      if (tx.status === 'Processing') {
        pendingAmount += amount;
      }
      if (tx.amount.startsWith('+')) {
        revenue += amount;
      } else {
        revenue -= amount;
      }
    });
    
    return {
      revenue: `Rs.${revenue.toFixed(2)}`,
      pending: pendingAmount.toFixed(2)
    };
  };
  
  const filteredStats = calculateFilteredStats();
  
  return (
    <section className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="md:w-1/5 bg-white shadow-md">
        <Sidebar />
      </div>
      
      {/* Main Content */}
      <div className="md:w-4/5 p-6 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">User Payment Details</h1>
          
          {/* Period Selector */}
          <div className="flex items-center space-x-2">
            <span className="text-gray-500">Period:</span>
            <select 
              className="bg-white border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
            >
              <option>Today</option>
              <option>This Week</option>
              <option>This Month</option>
              <option>This Quarter</option>
              <option>This Year</option>
            </select>
          </div>
        </div>
        
        {/* User Payment Stats Cards - Removed subscription card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-medium text-gray-500">User Revenue ({selectedPeriod})</div>
              <div className="p-2 rounded-lg bg-green-100">
                <DollarSign size={20} className="text-green-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-800">{filteredStats.revenue}</div>
            <div className="text-sm text-green-500 mt-2">{filteredTransactions.filter(t => t.amount.startsWith('+')).length} transactions</div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-medium text-gray-500">Pending User Payments</div>
              <div className="p-2 rounded-lg bg-orange-100">
                <CreditCard size={20} className="text-orange-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-800">{filteredStats.pending}</div>
            <div className="text-sm text-orange-500 mt-2">
              {filteredTransactions.filter(t => t.status === 'Processing').length} transactions pending
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-medium text-gray-500">Total Users</div>
              <div className="p-2 rounded-lg bg-blue-100">
                <Users size={20} className="text-blue-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-800">{stats.userCount}</div>
            <div className="text-sm text-blue-500 mt-2">+24 new this week</div>
          </div>
        </div>
        
        {/* User Payment Transactions */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">User Transactions ({selectedPeriod})</h2>
            <Link to="/admin/all-user-transactions" className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
              View All <ChevronRight size={16} />
            </Link>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((transaction, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.date}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{transaction.description}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium" 
                          style={{ color: transaction.amount.startsWith('+') ? '#16A34A' : '#DC2626' }}>
                        {transaction.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          transaction.status === 'Completed' 
                            ? 'bg-green-100 text-green-800' 
                            : transaction.status === 'Processing'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-red-100 text-red-800'
                        }`}>
                          {transaction.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button className="text-blue-600 hover:text-blue-800 mr-3">View</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                      No transactions found for the selected period
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        
        <h2 className="text-xl font-bold text-gray-800 mb-4">User Payment Management</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link to="/admin/user-invoices" className="block p-6 bg-white shadow-md rounded-xl hover:shadow-lg transition border-l-4 border-green-500">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold text-gray-800">User Invoices</h2>
              <CreditCard size={20} className="text-green-600" />
            </div>
            <p className="text-gray-600 mb-3">Generate and manage user payment invoices.</p>
            <div className="flex items-center text-green-600 text-sm font-medium">
              Manage Invoices <ChevronRight size={16} />
            </div>
          </Link>
          
          <Link to="/admin/payment-settings" className="block p-6 bg-white shadow-md rounded-xl hover:shadow-lg transition border-l-4 border-gray-500">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold text-gray-800">User Payment Settings</h2>
              <CreditCard size={20} className="text-gray-600" />
            </div>
            <p className="text-gray-600 mb-3">Configure user payment methods and options.</p>
            <div className="flex items-center text-gray-600 text-sm font-medium">
              Adjust Settings <ChevronRight size={16} />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};