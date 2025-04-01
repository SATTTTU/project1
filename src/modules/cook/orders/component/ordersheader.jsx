import React from "react";

export const OrdersHeader = ({ filterStatus, setFilterStatus, statusOptions }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold">Orders</h1>
        <p className="text-sm text-gray-500">
          {filterStatus === "pending"
            ? "Currently active orders"
            : `${filterStatus.charAt(0).toUpperCase() + filterStatus.slice(1)} orders`}
        </p>
      </div>

      <div className="flex space-x-2">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#426B1F] focus:outline-none focus:ring-1 focus:ring-[#426B1F]"
        >
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status === "all" ? "All Orders" : status.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
