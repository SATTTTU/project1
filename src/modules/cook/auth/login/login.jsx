import React, { useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";
import authimage from "../../../../assets/background1.jpg";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});

  // **Zod Schema for Validation**
  const formSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });

  // **Handle Change for Inputs**
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // **Validation Function**
  const validate = () => {
    try {
      formSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorObj = {};
        error.errors.forEach((err) => {
          errorObj[err.path[0]] = err.message;
        });
        setErrors(errorObj);
      }
      return false;
    }
  };

  // **Handle Submit**
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return; // Stop if validation fails

    console.log("Form Submitted:", formData);
    // Add API call or navigation logic here
  };

  return (
    <div>
      <div className="flex h-screen w-full">
        <div className="flex w-full flex-col justify-center px-8 md:w-1/2 lg:px-16">
          <div className="mx-auto w-full max-w-lg">
            <h1 className="mb-10 text-3xl font-bold text-[#4b6c1e]">
              Login as Cook
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm text-gray-600">
                  E-mail
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@gmail.com"
                  className="w-full rounded border border-gray-300 px-4 py-3 focus:border-[#4b6c1e] focus:outline-none"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>

              {/* Password Field */}
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
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full rounded border border-gray-300 px-4 py-3 focus:border-[#4b6c1e] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 transition ease-in-out"
                  >
                    {showPassword ? (
                      <FiEyeOff size={20} />
                    ) : (
                      <FiEye size={20} />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="rememberMe"
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-gray-300 text-[#4b6c1e] focus:ring-[#4b6c1e]"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 text-sm text-gray-600"
                  >
                    Remember me
                  </label>
                </div>
                <Link
                  to="/cook/forgetPassword"
                  className="text-sm text-[#4b6c1e] hover:underline cursor-pointer"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Submit Button */}
              <Link
                to="/cook/Homepage"
                type="submit"
                className="w-full p-10 rounded cursor-pointer bg-[#4b6c1e] py-3 text-white transition-colors hover:bg-[#3d5819]"
              >
                Log in
              </Link>
            </form>

            {/* OR Divider */}
            <div className="my-6 flex items-center">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 text-sm text-gray-500">OR</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            {/* Google Login */}
            <button
              type="button"
              className="flex w-full items-center cursor-pointer justify-center rounded border border-gray-300 bg-white py-3 text-gray-700 transition-colors hover:bg-gray-50"
            >
              <FcGoogle size={20} />
              Continue with Google
            </button>
          </div>
        </div>

        {/* Background Image & Sign-Up Section */}
        <div className="relative flex w-1/2">
          <div className="absolute inset-0 bg-black/30 z-10"></div>
          <img
            src={authimage}
            alt="Delicious food plate"
            className="object-cover"
          />
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white p-12">
            <h2 className="text-4xl font-bold mb-4">Hello, Friends</h2>
            <p className="text-center mb-2">Enter your Personal Details</p>
            <p className="text-center mb-8">Start journey with us</p>
            <Link
              className="bg-white text-black px-8 py-3 rounded hover:bg-gray-100 transition-colors cursor-pointer"
              to="/cook/preregister"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
