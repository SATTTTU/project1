
import { useEffect, useState } from "react"
import { Link,useNavigate, useSearchParams } from "react-router-dom"
import { useVerifyPayment } from "../api/verify-payment";
import { Modal } from "@/components/ui/modal/Modal";

export const OrderSuccess=()=> {
    const navigate = useNavigate();
      const [isModalOpen, setIsModalOpen] = useState(false);
    

  const { mutate: verifyPayment, isLoading: isVerifying } = useVerifyPayment({});
  const [searchParams] = useSearchParams();

    const handleVerifyPayment = async () => {
      const pidx = searchParams.get("pidx");
      console.log("token", pidx); // ✅ Get pidx from search params
      if (!pidx) {
        alert("Missing Payment ID");
        return;
      }
  
      verifyPayment(pidx, {
        onSuccess: (data) => {
          console.log("Payment verified:", data);
          navigate("/user/order-success");
          setIsModalOpen(false);
  
        },
        onError: (error) => {
        alert(`Payment Verification Failed: ${error.message}`);
      },
      });
  
    };
  
    const pidx = searchParams.get("pidx");
    console.log("window", pidx);
    useEffect(() => {
      const pidx = searchParams.get("pidx");
      console.log("Window ko output", pidx);
      if (pidx) {
        setIsModalOpen(true);
      }
    }, []);

  // useEffect(() => {
  //   const transactionData = localStorage.getItem("verified_transaction")
  //   if (transactionData) {
  //     try {
  //       const parsedData = JSON.parse(transactionData)
  //       setOrderDetails({
  //         orderId: parsedData.transaction_id || parsedData.pidx,
  //         amount: parsedData.amount ? (parsedData.amount / 100).toFixed(2) : null,
  //         date: new Date().toLocaleDateString(),
  //       })

  //       // Clear the data after using it
  //       localStorage.removeItem("verified_transaction")
  //     } catch (error) {
  //       console.error("Error parsing transaction data:", error)
  //     }
  //   }
  // }, [])

  return (
    <>
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-xl border border-slate-200 max-w-md w-full text-center">
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

        <h2 className="text-2xl font-bold mb-4">Order Confirmed!</h2>
        <p className="text-gray-600 mb-4">
          Thank you for your purchase. Your order has been received and is being processed.
        </p>

        {/* {orderDetails.orderId && (
          <div className="bg-gray-50 p-4 rounded-md my-4 text-left">
            <p className="font-medium mb-2">Order Details:</p>
            <p className="text-sm text-gray-600">
              Order ID: <span className="font-medium">{orderDetails.orderId}</span>
            </p>
            {orderDetails.amount && (
              <p className="text-sm text-gray-600">
                Amount: <span className="font-medium">Rs. {orderDetails.amount}</span>
              </p>
            )}
            <p className="text-sm text-gray-600">
              Date: <span className="font-medium">{orderDetails.date}</span>
            </p>
          </div>
        )} */}


        <div className="flex flex-col space-y-3">
          <Link
            to="/orders"
            className="inline-block bg-[#426B1F] text-white font-medium px-6 py-3 rounded-md hover:bg-[#426B1F] transition-colors"
          >
            View My Orderss
          </Link>
          <Link
            to="/user/dashboard"
            className="inline-block bg-gray-100 text-gray-800 font-medium px-6 py-3 rounded-md hover:bg-gray-200 transition-colors"
            >
            Continue Shopping
          </Link>
        </div>
      </div>
                </div>
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
              <div className="space-x-4 text-center">
                <h2 className="text-lg font-bold mb-2">Checkout Successful</h2>
                <p>Your checkout has been processed successfully!</p>
                <button
                  onClick={handleVerifyPayment}
                  className={`mt-4 bg-[#426B1F] text-white px-4 py-2 rounded-md ${
                    isVerifying ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={isVerifying}
                >
                  {isVerifying ? "Verifying..." : "Verify Payment"}
                </button>
                {/* <button
                  onClick={() => setIsModalOpen(false)}
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Close
                  </button> */}
              </div>
            </Modal>
                  </>
  )
}

