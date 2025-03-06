import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import * as z from "zod";
import Image from "../../../../../assets/Login.png";

// Define Zod schema
const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z.optional(z.string().min(2, "Name must be at least 2 characters")),
});

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 px-2">
      <div className="relative w-[800px] h-[500px] bg-white shadow-lg rounded-lg overflow-hidden flex border border-gray-300">
        {/* Sign Up Form */}
        {isSignUp && (
          <Formik
            initialValues={{ name: "", email: "", password: "" }}
            validationSchema={toFormikValidationSchema(schema)}
            onSubmit={(values) => console.log("Form submitted:", values)}
          >
            {() => (
              <Form className="w-1/2 p-8 transition-opacity duration-500 opacity-100">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Create Account</h1>
                <div className="flex gap-4 mb-5">
                  <Link to="/" className="text-red-500 text-3xl"><FcGoogle /></Link>
                </div>
                <Field name="name" type="text" placeholder="Name" className="block w-full p-2 mt-2 border rounded" />
                <ErrorMessage name="name" component="p" className="text-red-500 text-sm" />
                <Field name="email" type="email" placeholder="Email" className="block w-full p-2 mt-2 border rounded" />
                <ErrorMessage name="email" component="p" className="text-red-500 text-sm" />
                <Field name="password" type="password" placeholder="Password" className="block w-full p-2 mt-2 border rounded" />
                <ErrorMessage name="password" component="p" className="text-red-500 text-sm" />
                <button type="submit" className="bg-green-700 text-white px-4 py-2 rounded mt-4 w-full">Sign Up</button>
              </Form>
            )}
          </Formik>
        )}

        {/* Sign In Form */}
        {!isSignUp && (
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={toFormikValidationSchema(schema)}
            onSubmit={(values) => console.log("Form submitted:", values)}
          >
            {() => (
              <Form className="w-1/2 p-20 lg:p-8 transition-opacity duration-500 opacity-100">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Sign in User</h1>
                <div className="flex gap-4 mb-5">
                  <Link to="/" className="text-red-500 text-3xl"><FcGoogle /></Link>
                </div>
                <Field name="email" type="email" placeholder="Email" className="block w-full p-2 mt-2 border rounded border-slate-700" />
                <ErrorMessage name="email" component="p" className="text-red-500 text-sm" />
                <Field name="password" type="password" placeholder="Password" className="block w-full p-2 mt-2 border rounded" />
                <ErrorMessage name="password" component="p" className="text-red-500 text-sm" />
                <Link to="/" className="text-blue-500 mt-2 inline-block">Forgot your password?</Link>
                <button type="submit" className="bg-green-700 text-white px-4 py-2 rounded mt-4 w-full">Sign In</button>
              </Form>
            )}
          </Formik>
        )}

        {/* Overlay Panel */}
        <div
          style={{
            backgroundImage: `url(${Image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            left: isSignUp ? "50%" : "0%",
          }}
          className="absolute top-0 w-[400px] h-full text-white flex flex-col justify-center items-center transition-all duration-500"
        >
          <h1 className="text-5xl font-bold mb-3">{isSignUp ? "Hello, Friend!" : "Welcome Back!"}</h1>
          <p className="text-center text-md px-8">
            {isSignUp
              ? "Enter your details and start your journey with us."
              : "To keep connected with us, please sign in."}
          </p>
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="bg-green-600 text-white px-6 py-2 rounded-lg mt-6 hover:bg-green-400 hover:text-white transition-all"
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
