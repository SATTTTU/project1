import { useEffect } from "react";
import { useVerifyPayment } from "../api/verify-payment";

export const PaymentVerification = () => {
  const { mutate: verifyPayment, isLoading, isError, error, isSuccess } = useVerifyPayment(
    {
      onSuccess: (data) => {
        console.log("verify payment successful:", data);
        //   debugger;
      },
    }
  );

  useEffect(() => {
    const storedPidx = localStorage.getItem("khalti_pidx");
    if (storedPidx) {
      verifyPayment({ pidx: storedPidx });
    }
  }, [verifyPayment]);

  return (
    <div className="flex justify-center items-center flex-col mx-auto">
      <h2>Checkout Successful! Verifying Payment...</h2>
      {isLoading && <p>Verifying payment...</p>}
      {isError && <p style={{ color: "red" }}>Error: {error.message}</p>}
      {isSuccess && <p style={{ color: "green" }}>Payment Verified ✅</p>}
    </div>
  );
};


