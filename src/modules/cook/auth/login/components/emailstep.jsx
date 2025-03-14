// EmailStep.jsx - First step of the login process
import React from "react";

export const EmailStep = ({ email, error, handleChange, handleNextStep }) => {
  const onSubmit = (e) => {
    e.preventDefault();
    handleNextStep();
  };

  return (
    <>
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm text-gray-600">
          E-mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={handleChange}
          placeholder="example@gmail.com"
          className={`w-full rounded border ${
            error ? "border-red-500" : "border-gray-300"
          } px-4 py-3 focus:border-[#4b6c1e] focus:outline-none`}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>

      <button
        type="button"
        onClick={onSubmit}
        className="w-full rounded cursor-pointer bg-[#4b6c1e] py-3 text-white transition-colors hover:bg-[#3d5819]"
      >
        Continue
      </button>
    </>
  );
};