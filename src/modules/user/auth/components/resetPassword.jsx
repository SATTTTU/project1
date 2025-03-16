import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { IoEyeOffSharp } from "react-icons/io5";
import { useResetPasswordFormik } from "../../../../modules/user/auth/formik/resetPasswordFormik";

export const ResetPasswordForm = () => {
	const formik = useResetPasswordFormik();
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [hasNewPassword, setHasNewPassword] = useState(false);

	return (
		<form onSubmit={formik.handleSubmit} className="space-y-6">
			<h1 className="mb-10 text-3xl font-bold text-[#4b6c1e]">
				Reset your password
			</h1>
			<div className="text-gray-400">
				Remember, this password will be used across all your accounts and
				services associated with our platform. Choose a strong and secure
				password.
			</div>

			<div>
				<label
					htmlFor="new-password"
					className="block text-sm font-medium text-gray-900 mb-2"
				>
					New Password
				</label>
				<div className="relative">
					<input
						id="new-password"
						type={showNewPassword ? "text" : "password"}
						{...formik.getFieldProps("newPassword")}
						onChange={(e) => {
							formik.handleChange(e);
							setHasNewPassword(e.target.value.length > 0);
						}}
						className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
					/>
					{hasNewPassword && (
						<button
							type="button"
							onClick={() => setShowNewPassword(!showNewPassword)}
							className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
						>
							{showNewPassword ? (
								<IoEyeOffSharp className="h-5 w-5" />
							) : (
								<FaEye className="h-5 w-5" />
							)}
						</button>
					)}
				</div>
				{formik.touched.newPassword && formik.errors.newPassword && (
					<p className="text-red-500 text-sm">{formik.errors.newPassword}</p>
				)}
			</div>

			<button
				type="submit"
				className="w-full bg-[#426B1F] text-white py-2 px-4 rounded-md hover:bg-green-900 transition-colors"
			>
				Reset Password
			</button>
		</form>
	);
};
