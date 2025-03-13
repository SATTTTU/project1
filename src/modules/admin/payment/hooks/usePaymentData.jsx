// hooks/usePaymentData.js
import { useState, useEffect } from 'react';

export const usePaymentData = (userType, selectedPeriod) => {
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [filteredStats, setFilteredStats] = useState({ revenue: 'Rs.0.00', pending: '0.00' });
  const [withdrawRequests, setWithdrawRequests] = useState([
    { id: '1', cookId: 1, amount: 1200.0, user: 'Martha', email: 'marthaa@example.com', image: '/api/placeholder/60/60', date: 'Mar 5, 2025', status: 'pending' },
    { id: '2', cookId: 3, amount: 850.5, user: 'Samuel', email: 'sam224@example.com', image: '/api/placeholder/60/60', date: 'Mar 6, 2025', status: 'pending' },
    { id: '3', cookId: 5, amount: 1750.0, user: 'Cindy', email: 'cindy@example.com', image: '/api/placeholder/60/60', date: 'Mar 4, 2025', status: 'pending' }
  ]);

  // Mock data based on user type
  const data = {
    cook: {
      transactions: [
        { id: '#PAY-9001', date: 'Mar 6, 2025', cookId: 2, description: 'Payment to Chef Olivia', amount: '-Rs.500.00', status: 'Completed' },
        { id: '#PAY-8998', date: 'Mar 5, 2025', cookId: 4, description: 'Payment to Chef David', amount: '-Rs.320.50', status: 'Completed' },
        { id: '#PAY-8995', date: 'Mar 4, 2025', cookId: 1, description: 'Bonus to Chef Martha', amount: '-Rs.150.75', status: 'Completed' },
        { id: '#PAY-8990', date: 'Feb 28, 2025', cookId: 3, description: 'Payment to Chef Satish', amount: '-Rs.800.00', status: 'Completed' }
      ],
      stats: {
        totalCookPayout: 'Rs.45,890.50',
        pendingCookPayments: 'Rs.3,750.00',
        cookCount: '320'
      }
    },
    user: {
      transactions: [
        { id: '#TRX-8752', date: 'Mar 6, 2025', description: 'One-time payment from John Doe', amount: '+$149.99', status: 'Completed' },
        { id: '#TRX-8750', date: 'Mar 5, 2025', description: 'One-time payment from Sarah Johnson', amount: '+$89.50', status: 'Completed' },
        { id: '#TRX-8745', date: 'Mar 4, 2025', description: 'One-time meal purchase from Michael Brown', amount: '+$35.75', status: 'Completed' },
        { id: '#TRX-8742', date: 'Feb 28, 2025', description: 'Payment from Emily Davis', amount: '+$149.99', status: 'Processing' },
        { id: '#TRX-8735', date: 'Feb 20, 2025', description: 'Refund to Robert Wilson', amount: '-$89.50', status: 'Completed' },
        { id: '#TRX-8730', date: 'Feb 15, 2025', description: 'Payment from Jessica Taylor', amount: '+$75.25', status: 'Completed' },
        { id: '#TRX-8725', date: 'Jan 30, 2025', description: 'Payment from David Miller', amount: '+$120.00', status: 'Completed' },
        { id: '#TRX-8720', date: 'Jan 15, 2025', description: 'Payment from Lisa Anderson', amount: '+$95.50', status: 'Completed' }
      ],
      stats: {
        userCount: '1,245'
      }
    }
  };

  useEffect(() => {
    const currentDate = new Date();
    let startDate = new Date(currentDate);

    // Set the start date based on the selected period
    if (selectedPeriod === 'Today') {
      startDate.setHours(0, 0, 0, 0);
    } else if (selectedPeriod === 'This Week') {
      startDate.setDate(currentDate.getDate() - currentDate.getDay());
    } else if (selectedPeriod === 'This Month') {
      startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    } else if (selectedPeriod === 'This Quarter') {
      startDate.setMonth(Math.floor(currentDate.getMonth() / 3) * 3, 1);
    } else if (selectedPeriod === 'This Year') {
      startDate = new Date(currentDate.getFullYear(), 0, 1);
    }

    // Filter transactions based on date
    const filtered = data[userType].transactions.filter(tx => 
      new Date(tx.date) >= startDate
    );
    
    setFilteredTransactions(filtered);
    
    // Calculate statistics for user payments
    if (userType === 'user') {
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
    }
  }, [userType, selectedPeriod]);

  const handleApprove = (id) => {
    setWithdrawRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: 'processing' } : req))
    );
    const request = withdrawRequests.find((req) => req.id === id);
    if (request) {
      const newTransaction = {
        id: `#PAY-${9000 + Math.floor(Math.random() * 100)}`,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        cookId: request.cookId,
        description: `Payment to Chef ${request.user}`,
        amount: `-Rs.${request.amount.toFixed(2)}`,
        status: 'Processing'
      };
      setFilteredTransactions((prev) => [newTransaction, ...prev]);
    }
  };

  const handleReject = (id) => {
    setWithdrawRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: 'rejected' } : req))
    );
  };

  const handleArchive = (id) => {
    setWithdrawRequests((prev) => prev.filter((req) => req.id !== id));
  };

  return {
    filteredTransactions,
    filteredStats,
    withdrawRequests,
    stats: data[userType].stats,
    handleApprove,
    handleReject,
    handleArchive
  };
};