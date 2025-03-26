import { useEffect } from "react";
import { toast } from "react-toastify";
import { useVerifyPayment } from "../api/verify-payment";

const PaymentVerification = () => {
  const { mutate: verifyPayment, isLoading, isSuccess, isError, error } = useVerifyPayment({
    onSuccess: (data) => {
      console.log("Payment verified successfully:", data);
      toast.success("Payment verification successful!");
    },
    onError: (error) => {
      console.error("Payment verification failed:", error);
      toast.error(error.message || "Payment verification failed.");
    },
  });

  useEffect(() => {
    // Automatically verify payment if `pidx` exists in localStorage
    const storedPidx = localStorage.getItem("khalti_pidx");
    
    if (storedPidx) {
      console.log("Attempting to verify payment with pidx:", storedPidx);
      verifyPayment();  // Trigger payment verification
    }
  }, [verifyPayment]);

  return (
    <div>
      {isLoading && <p>Verifying payment...</p>}
      {isSuccess && <p>Payment verified successfully!</p>}
      {isError && <p style={{ color: "red" }}>Payment verification failed: {error?.message}</p>}
    </div>
  );
};

export default PaymentVerification;
