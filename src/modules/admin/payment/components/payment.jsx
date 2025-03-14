// pages/PaymentPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import { CreditCard, Users } from 'lucide-react';

export const PaymentPage = () => {
  return (
      <div className="md:w-3/4 mx-auto p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Payment Management</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link
            to="/admin/user-payments"
            className="block p-12 bg-white shadow-lg rounded-2xl hover:shadow-2xl transition transform hover:-translate-y-1 border-l-8 border-blue-500"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-gray-700">User Payment Details</h2>
              <Users size={24} className="text-blue-600" />
            </div>
            <p className="text-gray-600 mt-4 text-lg">
              View and manage all user transactions efficiently.
            </p>
          </Link>
          <Link
            to="/admin/cook-payments"
            className="block p-12 bg-white shadow-lg rounded-2xl hover:shadow-2xl transition transform hover:-translate-y-1 border-l-8 border-green-500"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-gray-700">Cook Payment Details</h2>
              <CreditCard size={24} className="text-green-600" />
            </div>
            <p className="text-gray-600 mt-4 text-lg">
              View and manage cook transactions seamlessly.
            </p>
          </Link>
        </div>
      </div>
  );
};