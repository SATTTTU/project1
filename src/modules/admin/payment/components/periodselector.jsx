// components/PeriodSelector.js
import React from 'react';
import { FiChevronDown } from 'react-icons/fi';

export const PeriodSelector = ({ selectedPeriod, onChange, options }) => (
  <div className="flex items-center space-x-2 relative">
    <span className="text-gray-500">Period:</span>
    <div className="relative">
      <select
        className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={selectedPeriod}
        onChange={onChange}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <FiChevronDown className="absolute right-4 top-3 text-gray-500 pointer-events-none" />
    </div>
  </div>
);
