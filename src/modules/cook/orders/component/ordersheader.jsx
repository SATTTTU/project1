// src/components/Orders/OrdersHeader.jsx
import React from "react";

export const OrdersHeader = ({ filterStatus, setFilterStatus }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold">Orders</h1>
        <p className="text-sm text-gray-500">
          {filterStatus === "Ongoing"
            ? "Currently active orders"
            : `${filterStatus} orders`}
        </p>
      </div>

      <div className="flex space-x-2">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#426B1F] focus:outline-none focus:ring-1 focus:ring-[#426B1F]"
        >
          <option value="Ongoing">Ongoing & Preparing</option>
          <option value="Ready">Ready</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
          <option value="All">All Orders</option>
        </select>
      </div>
    </div>
  );
};
