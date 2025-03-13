import React from "react";
import { Link } from "react-router-dom";
import { Table } from "@/components/ui/tables/tables";

export const CookTransactionTable = ({ transactions }) => {
  const transactionColumns = ["ID", "Date", "Chef", "Amount", "Status"];

  const renderTransactionRow = (transaction) => (
    <tr key={transaction.id} className="text-center border border-gray-300 odd:bg-white even:bg-gray-50">
      <td className="p-3">{transaction.id}</td>
      <td className="p-3">{transaction.date}</td>
      <td className="p-3">
        <Link to={`/cook-profile/${transaction.cookId}`} className="text-blue-600 hover:underline">
          {transaction.description.replace("Payment to ", "").replace("Bonus to ", "")}
        </Link>
      </td>
      <td className="p-3 text-red-600">{transaction.amount}</td>
      <td className="p-3">
        <span
          className={`px-2 py-1 rounded-md text-xs ${
            transaction.status === "Completed" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
          }`}
        >
          {transaction.status}
        </span>
      </td>
    </tr>
  );

  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium text-gray-800 mb-4">Transaction History</h3>
      <Table columns={transactionColumns} data={transactions} renderRow={renderTransactionRow} />
    </div>
  );
};
