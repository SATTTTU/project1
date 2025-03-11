import React from "react";

const PaymentSummary = () => {
  return (
    <div className="mt-6 bg-white p-5 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-medium text-gray-800 mb-4">Payment Processing Summary</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-50 p-4 rounded-md">
          <p className="text-sm text-gray-500">Active Gateways</p>
          <p className="text-2xl font-semibold text-gray-800">2/4</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-md">
          <p className="text-sm text-gray-500">Success Rate (30d)</p>
          <p className="text-2xl font-semibold text-gray-800">98.2%</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-md">
          <p className="text-sm text-gray-500">Avg. Processing Time</p>
          <p className="text-2xl font-semibold text-gray-800">1.8s</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSummary;
