import React from "react";
import { useWithdrawRequest } from "../formik/withdrawEarningsRequest";
import { toast } from "react-toastify";
import EarningsList from "./earningsList";

const WithdrawEarningsForm = () => {
	const { formik, isWithdrawing } = useWithdrawRequest({
		mutationConfig: {
			onSuccess: (data) => {
				toast.success(
					`Withdraw request successful: ${data.message || "Success"}`
				);
			},
			onError: (error) => {
				toast.error(`Withdraw request failed: ${error.message || "Fail"}`);
			},
		},
	});

	return (
		<div className="max-w-xl mx-auto  bg-white p-10 mt-18">
			<EarningsList />
			<form onSubmit={formik.handleSubmit} className="space-y-6 border border-slate-200 p-10 rounded-xl shadow-2xl">
			<h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
				Withdraw Earnings
			</h2>
				<div>
					<label className="block text-sm font-medium text-gray-700">Amount</label>
					<input
						type="text"
						name="amount"
						className="w-full border border-gray-300 rounded-lg px-4 py-3 mt-2 focus:outline-none focus:ring-2 focus:ring-green-500"
						placeholder="Enter amount"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.amount}
					/>
					{formik.touched.amount && formik.errors.amount && (
						<p className="text-red-500 text-sm mt-1">{formik.errors.amount}</p>
					)}
				</div>

				{/* Khalti Phone Number Field */}
				<div>
					<label className="block text-sm font-medium text-gray-700">
						Khalti Phone Number
					</label>
					<input
						type="text"
						name="khalti_phone"
						className="w-full border border-gray-300 rounded-lg px-4 py-3 mt-2 focus:outline-none focus:ring-2 focus:ring-green-500"
						placeholder="98XXXXXXXX"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.khalti_phone}
					/>
					{formik.touched.khalti_phone && formik.errors.khalti_phone && (
						<p className="text-red-500 text-sm mt-1">{formik.errors.khalti_phone}</p>
					)}
				</div>

				{/* Display API Error Message */}
				{formik.status?.success === false && (
					<p className="text-red-500 text-sm mt-2">{formik.errors.submit}</p>
				)}

				{/* Submit Button */}
				<button
					type="submit"
					className="w-full bg-[#426B1F] text-white py-3 rounded-lg shadow-md hover:bg-[#426B1F] disabled:bg-gray-400 transition duration-300"
					disabled={isWithdrawing}
				>
					{isWithdrawing ? (
						<span>Processing...</span>
					) : (
						<span>Withdraw</span>
					)}
				</button>
			</form>
		</div>
	);
};

export default WithdrawEarningsForm;
