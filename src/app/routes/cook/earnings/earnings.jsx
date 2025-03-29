// import CookNavBAr from "@/components/ui/cooknavbar/cooknavbar";
// import { Sidebar } from "@/components/ui/sideBar/sidebar";

// import React, { useState, useMemo } from "react";

// export const EarningsPage = () => {
//   // States for various functionalities
//   const [selectedPeriod, setSelectedPeriod] = useState("month");
//   const [showAllTransactions, setShowAllTransactions] = useState(false);
//   const [showWithdrawModal, setShowWithdrawModal] = useState(false);

//   // Get chart data based on selected period
//   const chartData = useMemo(() => {
//     switch (selectedPeriod) {
//       case "day":
//         return earningsData.dailyEarnings;
//       case "week":
//         return earningsData.weeklyEarnings;
//       case "year":
//         return earningsData.monthlyEarnings;
//       case "month":
//       default:
//         // Show only current month's weekly breakdown for "month" view
//         return earningsData.weeklyEarnings;
//     }
//   }, [selectedPeriod]);

//   // Decide which transactions to show based on showAllTransactions
//   const transactionsToShow = useMemo(
//     () =>
//       showAllTransactions
//         ? earningsData.allTransactions
//         : earningsData.allTransactions.slice(0, 5),
//     [showAllTransactions]
//   );

//   // Handle withdrawal form submission
//   const handleWithdraw = ({ amount, method }) => {
//     // In a real app, you'd make an API call here
//     alert(
//       `Withdrawal of ₹${amount} initiated to ${
//         method === "bank" ? "Bank Account" : "UPI"
//       }`
//     );
//     setShowWithdrawModal(false);
//   };

//   return (
//     <div className="flex h-screen flex-col">
//       <CookNavBAr />

//       <div className="flex flex-1 overflow-hidden">
//         <Sidebar />
//         <main className="flex-1 overflow-auto p-4 md:p-6 bg-gray-50">
//           <div className="mb-6">
//             <h1 className="text-2xl font-bold">Earnings</h1>
//             <p className="text-sm text-gray-500">
//               Track your income and withdrawals
//             </p>
//           </div>

//           {/* Earnings Summary */}
//           <div className="grid gap-4 mb-8 sm:grid-cols-3">
//             <EarningsSummaryCard
//               title="Total Earnings"
//               amount={earningsData.total}
//               subtitle="Lifetime earnings"
//             />
//             <EarningsSummaryCard
//               title="Available for Withdrawal"
//               amount={earningsData.available}
//               actionText="Withdraw Funds"
//               onAction={() => setShowWithdrawModal(true)}
//             />
//             <EarningsSummaryCard
//               title="Pending Clearance"
//               amount={earningsData.pending}
//               subtitle="Available in 3-5 days"
//             />
//           </div>

//           {/* Earnings Chart */}
//           <EarningsChart
//             selectedPeriod={selectedPeriod}
//             setSelectedPeriod={setSelectedPeriod}
//             chartData={chartData}
//           />

//           {/* Transactions */}
//           <TransactionsTable
//             transactions={transactionsToShow}
//             showAllTransactions={showAllTransactions}
//             setShowAllTransactions={setShowAllTransactions}
//           />
//         </main>
//       </div>

//       {/* Withdraw Modal */}
//       {showWithdrawModal && (
//         <WithdrawModal
//           availableAmount={earningsData.available}
//           onClose={() => setShowWithdrawModal(false)}
//           onSubmit={handleWithdraw}
//         />
//       )}
//     </div>
//   );
// };

// export default EarningsPage;

import { useAllEarnings } from '@/modules/cook/earnings/api/getAllEarnings'
import WithdrawEarningsForm from '@/modules/cook/earnings/components/withdrawEarnings'
import React from 'react'

export const WithdrawEarnings = () => {
  const {data:earnings}= useAllEarnings();
  console.log("earnings", earnings)
  return (
    <div>
      <WithdrawEarningsForm/>
    </div>
  )
}
