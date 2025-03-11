import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, CreditCard, DollarSign, Users } from 'lucide-react';
import { Sidebar } from '../../homepage/aside/aside';
import { Table } from '@/components/ui/tables/tables';

export const UserPaymentDetails = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('This Month');
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [filteredStats, setFilteredStats] = useState({ revenue: 'Rs.0.00', pending: '0.00' });
  
  // Mock data
  const stats = { userCount: '1,245' };
  
  const allTransactions = [
    { id: '#TRX-8752', date: 'Mar 6, 2025', description: 'One-time payment from John Doe', amount: '+$149.99', status: 'Completed' },
    { id: '#TRX-8750', date: 'Mar 5, 2025', description: 'One-time payment from Sarah Johnson', amount: '+$89.50', status: 'Completed' },
    { id: '#TRX-8745', date: 'Mar 4, 2025', description: 'One-time meal purchase from Michael Brown', amount: '+$35.75', status: 'Completed' },
    { id: '#TRX-8742', date: 'Feb 28, 2025', description: 'Payment from Emily Davis', amount: '+$149.99', status: 'Processing' },
    { id: '#TRX-8735', date: 'Feb 20, 2025', description: 'Refund to Robert Wilson', amount: '-$89.50', status: 'Completed' },
    { id: '#TRX-8730', date: 'Feb 15, 2025', description: 'Payment from Jessica Taylor', amount: '+$75.25', status: 'Completed' },
    { id: '#TRX-8725', date: 'Jan 30, 2025', description: 'Payment from David Miller', amount: '+$120.00', status: 'Completed' },
    { id: '#TRX-8720', date: 'Jan 15, 2025', description: 'Payment from Lisa Anderson', amount: '+$95.50', status: 'Completed' }
  ];
  
  // Table columns
  const columns = ['ID', 'Date', 'Description', 'Amount', 'Status', 'Actions'];
  
  // Filter transactions based on selected time period
  useEffect(() => {
    const currentDate = new Date();
    let startDate = new Date(currentDate);
    
    // Set start date based on period
    switch(selectedPeriod) {
      case 'Today':
        startDate.setHours(0, 0, 0, 0);
        break;
      case 'This Week':
        startDate.setDate(currentDate.getDate() - currentDate.getDay());
        break;
      case 'This Month':
        startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        break;
      case 'This Quarter':
        startDate.setMonth(Math.floor(currentDate.getMonth() / 3) * 3, 1);
        break;
      case 'This Year':
        startDate = new Date(currentDate.getFullYear(), 0, 1);
        break;
      default:
        startDate = new Date(0); // All transactions
    }
    
    // Filter transactions and calculate stats in one loop
    const filtered = allTransactions.filter(tx => new Date(tx.date) >= startDate);
    setFilteredTransactions(filtered);
    
    // Calculate stats
    let revenue = 0, pendingAmount = 0;
    filtered.forEach(tx => {
      const amount = parseFloat(tx.amount.replace(/[+$,]/g, ''));
      if (tx.status === 'Processing') pendingAmount += amount;
      revenue += tx.amount.startsWith('+') ? amount : -amount;
    });
    
    setFilteredStats({
      revenue: `Rs.${revenue.toFixed(2)}`,
      pending: pendingAmount.toFixed(2)
    });
  }, [selectedPeriod]);
  
  // Status badge style helper
  const getStatusStyle = (status) => {
    const styles = {
      'Completed': 'bg-green-100 text-green-800',
      'Processing': 'bg-blue-100 text-blue-800',
      'Failed': 'bg-red-100 text-red-800'
    };
    return styles[status] || 'bg-gray-100 text-gray-800';
  };
  
  // Custom row renderer for the Table component
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

  // Stat card component to reduce repetition
  const StatCard = ({ title, value, count, icon, color }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm font-medium text-gray-500">{title} {selectedPeriod !== 'All' && `(${selectedPeriod})`}</div>
        <div className={`p-2 rounded-lg bg-${color}-100`}>
          {icon}
        </div>
      </div>
      <div className="text-2xl font-bold text-gray-800">{value}</div>
      <div className={`text-sm text-${color}-500 mt-2`}>{count}</div>
    </div>
  );
  
  // Management link component
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

  // Period options
  const periodOptions = ['Today', 'This Week', 'This Month', 'This Quarter', 'This Year'];

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
              {periodOptions.map(period => (
                <option key={period}>{period}</option>
              ))}
            </select>
          </div>
        </div>
        
        {/* User Payment Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <StatCard 
            title="User Revenue"
            value={filteredStats.revenue}
            count={`${filteredTransactions.filter(t => t.amount.startsWith('+')).length} transactions`}
            icon={<DollarSign size={20} className="text-green-600" />}
            color="green"
          />
          
          <StatCard 
            title="Pending User Payments"
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
        
        {/* User Payment Transactions */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">User Transactions ({selectedPeriod})</h2>
            <Link to="/admin/all-user-transactions" className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
              View All <ChevronRight size={16} />
            </Link>
          </div>
          
          <Table 
            columns={columns}
            data={filteredTransactions}
            renderRow={renderTransactionRow}
          />
        </div>
        
        {/* User Payment Management Links */}
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
      </div>
    </section>
  );
};