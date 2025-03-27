import React from "react";
import { useWithdrawRequest } from "../formik/withdrawEarningsRequest";
import { toast } from "react-toastify";

const WithdrawEarningsForm = () => {
  const { formik, isWithdrawing } = useWithdrawRequest({
    mutationConfig: {
      onSuccess: (data) => {
        toast.success(`Withdraw request successful: ${data.message || "Success"}`);
      },
      onError: (error) => {
        toast.error(`Withdraw request failed: ${error.message || "Fail"}`);
      },
    },
  });

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Withdraw Earnings</h2>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {/* Amount Field */}
        <div>
          <label className="block text-sm font-medium">Amount</label>
          <input
            type="text"
            name="amount"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter amount"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.amount}
          />
          {formik.touched.amount && formik.errors.amount && (
            <p className="text-red-500 text-sm">{formik.errors.amount}</p>
          )}
        </div>

        {/* Khalti Phone Number Field */}
        <div>
          <label className="block text-sm font-medium">Khalti Phone Number</label>
          <input
            type="text"
            name="khalti_phone"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="98XXXXXXXX"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.khalti_phone}
          />
          {formik.touched.khalti_phone && formik.errors.khalti_phone && (
            <p className="text-red-500 text-sm">{formik.errors.khalti_phone}</p>
          )}
        </div>

        {/* Display API Error Message */}
        {formik.status?.success === false && (
          <p className="text-red-500 text-sm">{formik.errors.submit}</p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-400"
          disabled={isWithdrawing}
        >
          {isWithdrawing ? "Processing..." : "Withdraw"}
        </button>
      </form>
    </div>
  );
};

export default WithdrawEarningsForm;
