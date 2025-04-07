import React, { useState } from "react";
import { Table } from "@/components/ui/tables/tables";
import { useProvideMoney } from "../api/approveWithdrawRequest";

export const CookTransactionTable = ({
  transactions,
  onTransactionUpdated,
}) => {
  const transactionColumns = [
    "ID",
    "Date",
    "Info",
    "Amount",
    "Status",
    "Actions",
  ];
  const [processingId, setProcessingId] = useState(null);

  const { mutateAsync: approveMoney, isLoading } = useProvideMoney({
    mutationConfig: {
      onSuccess: () => {
        setProcessingId(null);
        if (onTransactionUpdated) onTransactionUpdated();
      },
      onError: () => {
        setProcessingId(null);
      },
    },
  });

  const handleApprove = async (transactionId) => {
    console.log("Transaction ID:", transactionId);
    try {
      setProcessingId(transactionId);
      await approveMoney(transactionId);
    } catch (error) {
      setProcessingId(null);
      console.error("Approval action failed:", error);
    }
  };

  const renderTransactionRow = (transaction) => (
    <tr
      key={transaction.id}
      className="text-center border border-gray-300 odd:bg-white even:bg-gray-50"
    >
      <td className="p-3">{transaction.id}</td>
      <td className="p-3">
        {new Date(transaction.created_at).toLocaleDateString()}
      </td>
      <td className="p-3">
        {transaction.notes?.replace("Withdrawal Request to ", "") || "N/A"}
      </td>
      <td className="p-3 text-red-600">{transaction.amount}</td>
      <td className="p-3">
        <span
          className={`px-2 py-1 rounded-md text-xs ${
            transaction.payment_status === "completed"
              ? "bg-green-100 text-green-800"
              : "bg-blue-100 text-blue-800"
          }`}
        >
          {transaction.payment_status.charAt(0).toUpperCase() +
            transaction.payment_status.slice(1)}
        </span>
      </td>
      <td className="p-3">
        {transaction.payment_status !== "completed" && (
          <button
            onClick={() => handleApprove(transaction.transaction_id)}
            disabled={isLoading && processingId === transaction.transaction_id}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 ease-in-out"
          >
            {isLoading && processingId === transaction.transaction_id ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6a8 8 0 0116 0v12a8 8 0 01-16 0V6z"
                  />
                </svg>
                Approving...
              </span>
            ) : (
              "Approve"
            )}
          </button>
        )}
      </td>
    </tr>
  );

  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium text-gray-800 mb-4">
        Transaction History
      </h3>
      <Table
        columns={transactionColumns}
        data={transactions}
        renderRow={renderTransactionRow}
      />
    </div>
  );
};
