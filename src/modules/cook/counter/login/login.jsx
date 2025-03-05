import React, { useState } from "react";
import { Link } from "react-router-dom";
import authimage from "../../../../assets/auth.png";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log({ email, password, rememberMe });
  };
  const [isSignUp, setIsSignUp] = useState(false);
  return (
    <div>
      <div className="flex h-screen w-full">
        <div
          className="flex w-full flex-col justify-center px-8 md:w-1/2 lg:px-16"
          style={{ left: isSignUp ? "100%" : "0%" }}
        >
          <div className="mx-auto w-full max-w-md">
            <h1 className="mb-10 text-3xl font-bold text-[#4b6c1e]">
              Login as Cook
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm text-gray-600">
                  E-mail
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@gmail.com"
                  className="w-full rounded border border-gray-300 px-4 py-3 focus:border-[#4b6c1e] focus:outline-none"
                  required
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-sm text-gray-600"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded border border-gray-300 px-4 py-3 focus:border-[#4b6c1e] focus:outline-none"
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 transition ease-in-out"
                  >
                    {showPassword ? (
                      <FiEyeOff size={20} />
                    ) : (
                      <FiEye size={20} />
                    )}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-[#4b6c1e] focus:ring-[#4b6c1e]"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 text-sm text-gray-600"
                  >
                    Remember me
                  </label>
                </div>
                <Link className="text-sm text-[#4b6c1e] hover:underline">
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full rounded bg-[#4b6c1e] py-3 text-white transition-colors hover:bg-[#3d5819]"
              >
                Next Step
              </button>
            </form>

            <div className="my-6 flex items-center">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 text-sm text-gray-500">OR</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <button
              type="button"
              className="flex w-full items-center justify-center rounded border border-gray-300 bg-white py-3 text-gray-700 transition-colors hover:bg-gray-50"
            >
              <FcGoogle size={20} />
              Continue with Google
            </button>
          </div>
        </div>
        <div className="relative w-1/2 flex">
          <div className="absolute inset-0 bg-black/30 z-10"></div>
          <img
            src={authimage}
            alt="Delicious food plate"
            className="object-cover"
            style={{ left: isSignUp ? "100%" : "0%" }}
          />
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white p-12">
            <h2 className="text-4xl font-bold mb-4">Hello, Friends</h2>
            <p className="text-center mb-2">Enter your Personal Details</p>
            <p className="text-center mb-8">Start journey with us</p>
            <Link
              className="bg-white text-black px-8 py-3 rounded hover:bg-gray-100 transition-colors"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
