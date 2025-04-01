import { useState, useEffect } from "react";
import { useGetAllTransactions } from "../api/getalltransactions";

export const usePaymentData = (userType, selectedPeriod) => {
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [filteredStats, setFilteredStats] = useState({ revenue: "Rs.0.00", pending: "0.00" });
  const [withdrawRequests, setWithdrawRequests] = useState([]);

  // Fetch transactions from API
  const { data, isLoading, isError } = useGetAllTransactions();
  const transactions = data?.transactions || [];

  useEffect(() => {
    if (!transactions.length) return;

    const currentDate = new Date();
    let startDate = new Date(currentDate);

    // Set start date based on selected period
    if (selectedPeriod === "Today") {
      startDate.setHours(0, 0, 0, 0);
    } else if (selectedPeriod === "This Week") {
      startDate.setDate(currentDate.getDate() - currentDate.getDay());
    } else if (selectedPeriod === "This Month") {
      startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    } else if (selectedPeriod === "This Quarter") {
      startDate.setMonth(Math.floor(currentDate.getMonth() / 3) * 3, 1);
    } else if (selectedPeriod === "This Year") {
      startDate = new Date(currentDate.getFullYear(), 0, 1);
    }

    // Filter transactions based on date
    const filtered = transactions.filter((tx) => new Date(tx.date) >= startDate);
    setFilteredTransactions(filtered);

    // Calculate statistics for user payments
    if (userType === "user") {
      let revenue = 0,
        pendingAmount = 0;

      filtered.forEach((tx) => {
        const amount = parseFloat(tx.amount.replace(/[+$,]/g, ""));
        if (tx.status === "Processing") pendingAmount += amount;
        revenue += tx.amount.startsWith("+") ? amount : -amount;
      });

      setFilteredStats({
        revenue: `Rs.${revenue.toFixed(2)}`,
        pending: pendingAmount.toFixed(2),
      });
    }
  }, [userType, selectedPeriod, transactions]);

  // ✅ Transaction Actions: Approve, Reject, Archive
  const handleApprove = (id) => {
    setWithdrawRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: "Processing" } : req))
    );

    const request = withdrawRequests.find((req) => req.id === id);
    if (request) {
      const newTransaction = {
        id: `#PAY-${9000 + Math.floor(Math.random() * 100)}`,
        date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
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
      prev.map((req) => (req.id === id ? { ...req, status: "Rejected" } : req))
    );
  };

  const handleArchive = (id) => {
    setWithdrawRequests((prev) => prev.filter((req) => req.id !== id));
  };

  return {
    filteredTransactions,
    filteredStats,
    withdrawRequests,
    handleApprove,
    handleReject,
    handleArchive,
    isLoading,
    isError,
  };
};
