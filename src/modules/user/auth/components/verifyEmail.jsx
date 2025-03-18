import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useVerifyEmail } from "../api/verifyEmail";

export const VerificationPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const id = searchParams.get("id");
  const hash = searchParams.get("hash");

  const { mutateAsync, isLoading, isSuccess, isError } = useVerifyEmail();

  useEffect(() => {
    if (id && hash) {
      handleVerify();
    }
  }, [id, hash]);

  const handleVerify = async () => {
    try {
      await mutateAsync({ id, hash });
      setTimeout(() => navigate(`/reset-password?id=${id}`), 3000);
    } catch (err) {
      console.error("Verification failed:", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold">Email Verification</h1>

      {isLoading && <p>Verifying...</p>}
      {isSuccess && <p className="text-green-600">Verified! Redirecting...</p>}
      {isError && <p className="text-red-600">Verification failed.</p>}

      {!isSuccess && !isLoading && (
        <button
          onClick={handleVerify}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        >
          Verify Email
        </button>
      )}
    </div>
  );
};
