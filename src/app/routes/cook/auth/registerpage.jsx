import CookNavBAr from "@/components/ui/cooknavbar/cooknavbar";
import MultiStepForm from "@/modules/cook/auth/components/multistepform";

export const RegisterPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <CookNavBAr />
      <div className="flex flex-grow items-center justify-center px-4">
        <div className="w-full max-w-3xl sm:max-w-4xl lg:max-w-5xl px-6">
          <MultiStepForm />
        </div>
      </div>
    </div>
  );
};
