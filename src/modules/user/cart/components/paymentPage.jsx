// import { PaymentNavigator } from "../components/payment-navigator"
import { Link } from "react-router-dom"
import { PaymentNavigator } from "./paymentNavigator"

export const PaymentPage=()=> {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">Payment</h1>

        <PaymentNavigator />

        <div className="mt-6 text-center">
          <Link to="/cart" className="text-purple-600 hover:text-purple-800 text-sm font-medium">
            Return to cart
          </Link>
        </div>

        <div className="mt-8 bg-gray-100 p-4 rounded-md">
          <h3 className="font-medium mb-2">How it works:</h3>
          <ol className="list-decimal pl-5 text-sm space-y-1 text-gray-700">
            <li>After checkout, we store the payment ID (pidx) in your browser's localStorage</li>
            <li>When you click "Continue to Payment", we retrieve this pidx</li>
            <li>
              We construct the URL:{" "}
              <code className="bg-gray-200 px-1 rounded">https://test-pay.khalti.com/?pidx=YOUR_PIDX</code>
            </li>
            <li>You're redirected to Khalti to complete your payment</li>
            <li>After payment, Khalti will redirect you back to our callback page</li>
          </ol>
        </div>
      </div>
    </div>
  )
}

