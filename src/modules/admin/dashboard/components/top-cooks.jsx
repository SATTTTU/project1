// components/TopCooksList.js
import React from "react";
import { Link } from "react-router-dom";

export const TopCooksList = ({ cooks }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Top Performing Cooks</h2>
        <Link to="/admin/cooks" className="text-blue-500 text-sm hover:underline">
          View All
        </Link>
      </div>
      <div className="space-y-4">
        {cooks.map((cook, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div>
              <span className="text-sm font-medium text-gray-900">{cook.name}</span>
              <div className="flex items-center mt-1">
                <span className="text-sm text-yellow-500">★</span>
                <span className="text-sm text-gray-500 ml-1">{cook.rating}</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-sm font-medium text-gray-900">{cook.earnings}</span>
              <p className="text-sm text-gray-500">{cook.orders} orders</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
