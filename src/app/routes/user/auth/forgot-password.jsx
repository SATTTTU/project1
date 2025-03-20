import { ForgotPasswordForm } from "@/modules/user/auth/components/forgetPassword";
import { AuthLayout } from "@/components/layout/auth/AuthLayout";

export const ForgotPassword = () => {
	return (
		<AuthLayout>
			<ForgotPasswordForm />
		</AuthLayout>
	);
};
