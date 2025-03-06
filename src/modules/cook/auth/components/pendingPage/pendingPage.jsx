import React from "react";
import profile from "../../../../../assets/cookimage.png";
export const pendingPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-md text-center px-4">
        <div className="relative mx-auto mb-8 h-28 w-28 md:h-32 md:w-32">
          <div className="h-full w-full overflow-hidden rounded-full">
            <img
              src={profile}
              alt="Profile picture"
              width={128}
              height={128}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <h1 className="mb-4 text-2xl font-semibold text-gray-800 leading-tight">
          Thank you — your account is under review.
        </h1>

        <p className="text-lg text-gray-600">This will only take a few days.</p>
      </div>
    </div>
  );
};
