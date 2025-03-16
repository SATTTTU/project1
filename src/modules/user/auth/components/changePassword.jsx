import { PasswordInput } from "@/components/ui/passwordfield/passwordField";
import { useChangePasswordFormik } from "../../../../modules/user/auth/formik/changeFormik";
import { useState } from "react";

export const ChangePasswordForm = () => {
	const { formik } = useChangePasswordFormik();
	const [showCurrentPassword, setShowCurrentPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	
	return (
		<form onSubmit={formik.handleSubmit} className="space-y-3">
			<PasswordInput
				label="Current Password"
				name="currentPassword"
				value={formik.values.currentPassword}
				onChange={formik.handleChange}
				showPassword={showCurrentPassword}
				toggleShowPassword={() => setShowCurrentPassword(!showCurrentPassword)}
			/>
		
			{formik.errors.currentPassword && (
				<p className="text-red-500 text-sm">{formik.errors.currentPassword}</p>
			)}

			<PasswordInput
				label="New Password"
				name="newPassword"
				value={formik.values.newPassword}
				onChange={formik.handleChange}
				showPassword={showNewPassword}
				toggleShowPassword={() => setShowNewPassword(!showNewPassword)}
			/>
			{formik.errors.newPassword && (
				<p className="text-red-500 text-sm">{formik.errors.newPassword}</p>
			)}

			<PasswordInput
				label="Confirm New Password"
				name="confirmPassword"
				value={formik.values.confirmPassword}
				onChange={formik.handleChange}
				showPassword={showConfirmPassword}
				toggleShowPassword={() => setShowConfirmPassword(!showConfirmPassword)}
			/>
			{formik.errors.confirmPassword && (
				<p className="text-red-500 text-sm">{formik.errors.confirmPassword}</p>
			)}

			<button
				type="submit"
				className="w-full bg-[#426B1F] text-white py-2 rounded-md hover:bg-green-900"
			>
				Change Password
			</button>
		</form>
	);
};
