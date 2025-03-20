import LoginImage from "@/assets/login.jpg";
import { RegisterForm } from "@/modules/user/auth/components/registerForm";
import { WelcomeRegisterPanel } from "@/modules/user/auth/components/registerPanel";

export const RegisterPage = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen w-full">
      <WelcomeRegisterPanel image={LoginImage} />
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 mt-20 p-8">
        <RegisterForm />
      </div>
    </div>
  );
};