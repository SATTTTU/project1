import { useState } from "react";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { signInSchema, signUpSchema } from "../../../../../modules/user/auth/formik/schema/authSchema";
import LoginSection from "./LoginSection";  
import Image from "../../../../../assets/healthy.jpg";
import RegisterForm from "./RegisterSection";

const LoginForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rememberMe: false,
    },
    validationSchema: toFormikValidationSchema(isSignUp ? signUpSchema : signInSchema), // Convert Zod to Formik schema
    onSubmit: (values) => {
      console.log("Form Submitted:", values);
    },
  });

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-gray-100 px-2">
      <div className="relative w-full h-full bg-white shadow-lg rounded-lg overflow-hidden flex border border-gray-300">
        <LoginSection formik={formik} setIsSignUp={setIsSignUp}/>
		<RegisterForm formik={formik}/>

        {/* Overlay Panel */}
        <div
          style={{
            backgroundImage: `url(${Image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            left: isSignUp ? "0%" : "50%",
          }}
          className="absolute inset-0 w-1/2 h-full text-white flex flex-col justify-center items-center transition-all duration-500"
        >
          <div className="absolute inset-0 bg-opacity-410"></div>
          <div className="relative z-10 text-center px-8">
            <h1 className="text-6xl font-bold mb-3">{isSignUp ? "Welcome Back!" : "Hello, Friends"}</h1>
            <p className="text-center text-lg max-w-md mx-auto">
              {isSignUp
                ? "To keep connected with us, please sign in with your personal info."
                : "Enter your Personal Details\nStart journey with us"}
            </p>
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="mt-8 text-white bg-green-900 text-xl px-8 py-3 rounded-md transition-all"
            >
              {isSignUp ? "Sign In" : "Sign up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
