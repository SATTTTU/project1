import { Link } from "react-router-dom";

export const OrderConfirmation = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
 
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Order Confirmed!</h2>
            <p className="text-gray-600 mt-2">Thank you for your order. Your order has been placed successfully.</p>
          </div>

          <div className="border-t border-b py-4 mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Order Number:</span>
              <span className="font-semibold">KHB-{Math.floor(Math.random() * 10000)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Estimated Delivery:</span>
              <span className="font-semibold">30-45 minutes</span>
            </div>
          </div>

          <div className="text-center">
            <Link
              to="/user/dashboard"
              className="inline-flex items-center px-6 py-3 bg-[#426B1F] text-white rounded-lg hover:bg-green-900"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};