import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { IoEyeOffSharp } from "react-icons/io5";
import Label from "@/components/ui/label/label";
import Input from "@/components/ui/input/input";
import { useResetPasswordFormik } from "../../../../modules/user/auth/formik/resetPasswordFormik";

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
				Choose a strong password that you’ll use across all our services.
			</p>

			<div className="space-y-2 relative">
				<Label htmlFor="newPassword">New Password</Label>
				<Input
					id="newPassword"
					name="newPassword"
					type={showNewPassword ? "text" : "password"}
					placeholder="Enter new password"
					value={formik.values.newPassword}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					className={`w-full ${formik.touched.newPassword && formik.errors.newPassword ? "border-red-500" : ""}`}
				/>
				<button
					type="button"
					onClick={() => setShowNewPassword((prev) => !prev)}
					className="absolute right-3 top-12 transform -translate-y-1/2 text-gray-500"
				>
					{showNewPassword ? <IoEyeOffSharp size={20} /> : <FaEye size={20} />}
				</button>
				{formik.touched.newPassword && formik.errors.newPassword && (
					<div className="text-red-500 text-sm">{formik.errors.newPassword}</div>
				)}
			</div>

			<div className="space-y-2 relative">
				<Label htmlFor="confirmPassword">Confirm Password</Label>
				<Input
					id="confirmPassword"
					name="confirmPassword"
					type={showConfirmPassword ? "text" : "password"}
					placeholder="Confirm new password"
					value={formik.values.confirmPassword}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					className={`w-full ${formik.touched.confirmPassword && formik.errors.confirmPassword ? "border-red-500" : ""}`}
				/>
				<button
					type="button"
					onClick={() => setShowConfirmPassword((prev) => !prev)}
					className="absolute right-3 top-12 transform -translate-y-1/2 text-gray-500"
				>
					{showConfirmPassword ? <IoEyeOffSharp size={20} /> : <FaEye size={20} />}
				</button>
				{formik.touched.confirmPassword && formik.errors.confirmPassword && (
					<div className="text-red-500 text-sm">{formik.errors.confirmPassword}</div>
				)}
			</div>

			{/* Submit Button */}
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
