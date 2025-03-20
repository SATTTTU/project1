import { ForgotPassword } from "../../user/auth/forgot-password";

export const PendingPageroute = () => {
	return (
		<div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
			<ForgotPassword />
		</div>
	);
};
