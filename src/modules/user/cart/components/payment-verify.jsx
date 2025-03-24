"use client"

import { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
// import { useVerifyPayment } from "../api/verify-payment"
import { toast } from "react-toastify"
import { useVerifyPayment } from "../api/verify-payment"

export const PaymentVerify=()=> {
  const [verificationStatus, setVerificationStatus] = useState("verifying")
  const navigate = useNavigate()
  const location = useLocation()

  // Use the verification hook
  const {
    mutateAsync: verifyPayment,
    isLoading,
    isError,
    error,
  } = useVerifyPayment({
    mutationConfig: {
      onSuccess: (data) => {
        // Handle successful verification
        console.log("Payment verified successfully:", data)
        setVerificationStatus("success")

        // Clear the transaction from localStorage
        localStorage.removeItem("khalti_transaction")

        // Show success message
        toast.success("Payment successful!")

        // Redirect to success page after a short delay
        setTimeout(() => navigate("/order-success"), 2000)
      },
      onError: (error) => {
        // Handle verification error
        console.error("Payment verification failed:", error)
        setVerificationStatus("failed")

        // Show error message
        toast.error(error.message || "Payment verification failed")

        // Redirect back to cart after a short delay
        setTimeout(() => navigate("/cart"), 3000)
      },
    },
  })

  useEffect(() => {
    const verifyTransaction = async () => {
      try {
        // Get URL parameters
        const queryParams = new URLSearchParams(location.search)
        const pidx = queryParams.get("pidx")
        const status = queryParams.get("status")
        const amount = queryParams.get("amount")
        const mobile = queryParams.get("mobile")
        const transaction_id = queryParams.get("transaction_id")

        // Get stored transaction details
        const storedTransaction = localStorage.getItem("khalti_transaction")

        if (!pidx || !storedTransaction) {
          setVerificationStatus("failed")
          toast.error("Invalid payment session")
          setTimeout(() => navigate("/cart"), 3000)
          return
        }

        const transaction = JSON.parse(storedTransaction)

        // Verify if this is the same transaction we initiated
        if (transaction.pidx !== pidx) {
          setVerificationStatus("failed")
          toast.error("Transaction mismatch")
          setTimeout(() => navigate("/cart"), 3000)
          return
        }

        // If status is already provided as failed
        if (status === "failed") {
          setVerificationStatus("failed")
          toast.error("Payment was not successful")
          setTimeout(() => navigate("/cart"), 3000)
          return
        }

        // Prepare verification data
        const verificationData = {
          pidx,
          status,
          amount,
          mobile,
          transaction_id,
        }

        // Call the verification API
        await verifyPayment(verificationData)
      } catch (error) {
        console.error("Error in verification process:", error)
        setVerificationStatus("failed")
        toast.error("Error verifying payment")
        setTimeout(() => navigate("/cart"), 3000)
      }
    }

    // Start verification when component mounts
    verifyTransaction()
  }, [location, navigate, verifyPayment])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <div className="mb-4">
          {verificationStatus === "verifying" && (
            <>
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto mb-4"></div>
              <h2 className="text-xl font-bold">Verifying Payment</h2>
              <p className="text-gray-600 mt-2">Please wait while we verify your payment...</p>
            </>
          )}

          {verificationStatus === "success" && (
            <>
              <div className="bg-green-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-green-600">Payment Successful!</h2>
              <p className="text-gray-600 mt-2">Your payment has been processed successfully.</p>
              <p className="text-gray-600 mt-1">Redirecting to order confirmation...</p>
            </>
          )}

          {verificationStatus === "failed" && (
            <>
              <div className="bg-red-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-red-600">Payment Failed</h2>
              <p className="text-gray-600 mt-2">We couldn't process your payment.</p>
              <p className="text-gray-600 mt-1">Redirecting back to cart...</p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

