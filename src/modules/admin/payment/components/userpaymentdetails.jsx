import React from "react";
import { Link } from "react-router-dom"; // Import the Link component

export const TransactionRow = ({ tx }) => {
  const getStatusStyle = (status) => ({
    Completed: "bg-green-100 text-green-800",
    Processing: "bg-blue-100 text-blue-800",
    Failed: "bg-red-100 text-red-800",
  }[status] || "bg-gray-100 text-gray-800");

  return (
    <tr className="text-center border border-gray-300 odd:bg-white even:bg-gray-50 text-base text-gray-800">
      <td className="p-3">{tx.id}</td>
      <td className="p-3">{tx.date}</td>
      <td className="p-3">{tx.description}</td>
      <td
        className="p-3 font-medium"
        style={{ color: String(tx.amount).startsWith("+") ? "#16A34A" : "#DC2626" }}
      >
        {tx.amount}
      </td>
      <td className="p-3">
        <span className={`px-2 py-1 text-xs rounded-full ${getStatusStyle(tx.status)}`}>
          {tx.status}
        </span>
      </td>
      <td className="p-3">
        {/* Replace button with a Link */}
        <Link to={`/transaction/${tx.id}`} className="text-blue-600 hover:text-blue-800">
          View
        </Link>
      </td>
    </tr>
  );
};
