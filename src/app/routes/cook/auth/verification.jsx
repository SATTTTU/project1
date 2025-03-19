import React from "react";
import { FaCheck } from "react-icons/fa";

export const VerificationRoute = () => {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="mx-auto max-w-md rounded-xl bg-white p-8 text-center shadow-lg">
        <h1 className="mb-2 text-3xl font-medium text-gray-700">
          Verify Your Email
        </h1>
        <p className="mb-8 text-gray-500">
          Check your email & click the link to activate your account.
        </p>
        
        <div className="mx-auto mb-6 w-40">
          {/* Email envelope illustration */}
          <div className="relative mx-auto">
            <div className="aspect-[4/3] w-full overflow-hidden rounded-t-xl bg-sky-200">
              <div className="absolute left-0 top-0 h-0 w-0 border-l-[80px] border-r-[80px] border-t-[60px] border-l-transparent border-r-transparent border-t-sky-300"></div>
            </div>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-b-xl bg-sky-300">
              {/* Green checkmark circle */}
              <div className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-green-500 text-white">
                <FaCheck className="h-8 w-8 stroke-[3]" />
              </div>
            </div>
          </div>
        </div>
        
        <button className="mt-4 w-full rounded-lg bg-[#4b6c1e] px-4 py-3 font-medium text-white transition hover:bg-[#5a8225]">
          Resend Verification Email
        </button>
      </div>
    </div>
  );
};