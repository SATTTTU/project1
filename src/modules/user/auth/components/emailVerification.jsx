import { FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const EmailVerification = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-gray-50">
      <div className="mx-auto max-w-md rounded-xl bg-white p-8 text-center shadow-lg">
        <h1 className="mb-2 text-3xl font-semibold text-gray-800">
          Verify Your Email
        </h1>
        <p className="mb-8 text-gray-500">
          Check your email and click the verification link to activate your account.
        </p>

        <div className="mx-auto mb-6 w-40">
          <div className="relative mx-auto">
            {/* Top of envelope */}
            <div className="aspect-[4/3] w-full overflow-hidden rounded-t-xl bg-sky-200">
              <div className="absolute left-0 top-0 h-0 w-0 border-l-[80px] border-r-[80px] border-t-[60px] border-l-transparent border-r-transparent border-t-sky-300"></div>
            </div>

            {/* Bottom of envelope */}
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-b-xl bg-sky-300">
              {/* Green checkmark circle */}
              <div className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-green-500 text-white shadow-lg">
                <FaCheck className="h-8 w-8" />
              </div>
            </div>
          </div>
        </div>

        {/* <button
          onClick={() => navigate("/login")}
          className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition duration-200"
        >
          Go to Login
        </button> */}
      </div>
    </div>
  );
};
