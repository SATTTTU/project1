import React from 'react';
import { Link } from 'react-router-dom';
import { Sidebar } from '../homepage/aside/aside';

 export const PaymentPage = () => {
  return (
    <section className="flex h-screen">
      {/* Sidebar */}
        <Sidebar  />

      {/* Main Content */}
      <div className="md:w-3/4 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Payment Section</h1>
        
        {/* Navigational Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link to="/admin/user-payments" className="block p-12 bg-white shadow-lg rounded-2xl hover:shadow-2xl transition transform hover:-translate-y-1 border-l-8 border-blue-500 text-center">
            <h2 className="text-2xl font-semibold text-gray-700">User Payment Details</h2>
            <p className="text-gray-600 mt-4 text-lg">View and manage all user transactions efficiently.</p>
          </Link>

          <Link to="/admin/cook-payments" className="block p-12 bg-white shadow-lg rounded-2xl hover:shadow-2xl transition transform hover:-translate-y-1 border-l-8 border-green-500 text-center">
            <h2 className="text-2xl font-semibold text-gray-700">Cook Payment Details</h2>
            <p className="text-gray-600 mt-4 text-lg">View and manage cook transactions seamlessly.</p>
          </Link>
        </div>
      </div>
    </section>
  );
};

