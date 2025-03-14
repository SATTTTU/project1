// components/StatCard.js
import React from 'react';

export const StatCard = ({ title, value, count, icon, color }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
    <div className="flex items-center justify-between mb-4">
      <div className="text-sm font-medium text-gray-500">{title}</div>
      <div className={`p-2 rounded-lg bg-${color}-100`}>
        {icon}
      </div>
    </div>
    <div className="text-2xl font-bold text-gray-800">{value}</div>
    {count && <div className={`text-sm text-${color}-500 mt-2`}>{count}</div>}
  </div>
);