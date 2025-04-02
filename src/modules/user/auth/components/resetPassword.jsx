import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { IoEyeOffSharp } from "react-icons/io5";
import Label from "@/components/ui/label/label";
import Input from "@/components/ui/input/input";
import { useResetPasswordFormik } from "../formik/resetPasswordFormik";

export const ResetPasswordForm = () => {
	const { formik } = useResetPasswordFormik();
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	return (
		<form onSubmit={formik.handleSubmit} className="space-y-6">
			<h1 className="mb-6 text-3xl font-bold text-[#4b6c1e]">
				Reset your password
			</h1>
			<p className="text-gray-400">
				Choose a strong password that you’ll use across all your services.
			</p>
			{/* <div>
				<label className="block text-sm font-medium">Email</label>
				<input
					type="email"
					name="email"
					value={formik.values.email}
					onChange={formik.handleChange}
					className="w-full px-4 py-2 border rounded-md"
				/>
				{formik.errors.email && (
					<p className="text-red-500">{formik.errors.email}</p>
				)}
			</div> */}
			<div className="space-y-2 relative">
				<Label htmlFor="password">New Password</Label>
				<Input
					id="password"
					name="password"
					type={showNewPassword ? "text" : "password"}
					placeholder="Enter new password"
					value={formik.values.password}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					className={`w-full ${
						formik.touched.password && formik.errors.password
							? "border-red-500"
							: ""
					}`}
				/>
				<button
					type="button"
					onClick={() => setShowNewPassword((prev) => !prev)}
					className="absolute right-3 top-12 transform -translate-y-1/2 text-gray-500"
				>
					{showNewPassword ? <IoEyeOffSharp size={20} /> : <FaEye size={20} />}
				</button>
				{formik.touched.password && formik.errors.password && (
					<div className="text-red-500 text-sm">{formik.errors.password}</div>
				)}
			</div>

			<div className="space-y-2 relative">
				<Label htmlFor="password_confirmation">Confirm Password</Label>
				<Input
					id="password_confirmation"
					name="password_confirmation"
					type={showConfirmPassword ? "text" : "password"}
					placeholder="Confirm new password"
					value={formik.values.password_confirmation}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					className={`w-full ${
						formik.touched.password_confirmation &&
						formik.errors.password_confirmation
							? "border-red-500"
							: ""
					}`}
				/>
				<button
					type="button"
					onClick={() => setShowConfirmPassword((prev) => !prev)}
					className="absolute right-3 top-12 transform -translate-y-1/2 text-gray-500"
				>
					{showConfirmPassword ? (
						<IoEyeOffSharp size={20} />
					) : (
						<FaEye size={20} />
					)}
				</button>
				{formik.touched.password_confirmation &&
					formik.errors.password_confirmation && (
						<div className="text-red-500 text-sm">
							{formik.errors.password_confirmation}
						</div>
					)}
			</div>

			<button
				type="submit"
				className="w-full bg-[#426B1F] text-white py-2 px-4 rounded-md hover:bg-green-900 transition-colors"
				disabled={formik.isSubmitting}
			>
				{formik.isSubmitting ? "Resetting..." : "Reset Password"}
			</button>
		</form>
	);
};
