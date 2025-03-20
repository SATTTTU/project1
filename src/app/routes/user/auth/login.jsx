import { LoginForm } from "@/modules/user/auth/components/loginForm";
import LoginImage from "@/assets/login.jpg";
import { WelcomeLoginPanel } from "@/modules/user/auth/components/loginPanel";

export const LoginPage = () => {
	return (
		<div className="flex flex-col md:flex-row h-screen w-full">
			<div className="flex flex-col justify-center items-center w-full md:w-1/2 mt-20 p-8">
				<LoginForm />
			</div>
			<WelcomeLoginPanel image={LoginImage} />
		</div>
	);
};
