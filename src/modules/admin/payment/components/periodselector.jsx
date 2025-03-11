// components/PeriodSelector.js
import React from 'react';

export const PeriodSelector = ({ selectedPeriod, onChange, options }) => (
  <div className="flex items-center space-x-2">
    <span className="text-gray-500">Period:</span>
    <select
      className="bg-white border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      value={selectedPeriod}
      onChange={onChange}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);