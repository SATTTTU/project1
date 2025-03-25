"use client"

import { getKhaltiPidx } from "@/utils/payment-utils"
import { useState, useEffect } from "react"
// import { getKhaltiPidx, navigateToKhaltiPayment } from "../utils/payment-utils"
import { toast } from "react-toastify"

export const PaymentNavigator=()=> {
  const [pidx, setPidx] = useState("")
  const [isNavigating, setIsNavigating] = useState(false)

  // Load pidx from localStorage on component mount
  useEffect(() => {
    const storedPidx = getKhaltiPidx()
    if (storedPidx) {
      setPidx(storedPidx)
    }
  }, [])

  const handleNavigate = () => {
    if (!pidx) {
      toast.error("No payment ID (pidx) found")
      return
    }

    setIsNavigating(true)

    try {
      // Navigate to Khalti payment page
      const success = navigateToKhaltiPayment()

      if (!success) {
        toast.error("Failed to navigate to payment page")
        setIsNavigating(false)
      }
    } catch (error) {
      console.error("Navigation error:", error)
      toast.error("An error occurred while navigating to payment page")
      setIsNavigating(false)
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Continue to Payment</h2>

      <div className="mb-4">
        <p className="text-gray-600 mb-2">
          {pidx
            ? "Your payment is ready to process. Click the button below to continue to Khalti."
            : "No payment ID found. Please complete checkout first."}
        </p>

        {pidx && (
          <div className="bg-gray-100 p-3 rounded-md mb-4">
            <p className="text-sm font-medium">Payment ID (pidx):</p>
            <p className="text-xs font-mono break-all">{pidx}</p>
          </div>
        )}
      </div>

      <button
        onClick={handleNavigate}
        disabled={!pidx || isNavigating}
        className={`w-full bg-purple-600 text-white py-3 rounded-md font-medium hover:bg-purple-700 transition-colors ${
          !pidx || isNavigating ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {isNavigating ? "Navigating..." : "Continue to Khalti Payment"}
      </button>
    </div>
  )
}

