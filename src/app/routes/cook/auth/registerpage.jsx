import CookNavBAr from "@/components/ui/cooknavbar/cooknavbar";
import MultiStepForm from "@/modules/cook/auth/components/multistepform";

export const RegisterPage = () => {
  return (
    <div className="hidden md:flex flex-col min-h-screen w-full">
      <CookNavBAr />
      <div className="flex flex-grow items-center justify-center">
        <MultiStepForm className="w-full max-w-5xl px-4" />
      </div>
    </div>
  );
};
