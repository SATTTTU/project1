import React, { useState } from "react";
import { FaEnvelope, FaUser } from "react-icons/fa";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link } from "react-router-dom";
import { z } from "zod";
import authimage from "../../../../../assets/background1.jpg";

export const firstRegisterPage = () => {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // Zod Schema for Validation
  const formSchema = z.object({
    fullname: z.string().min(2, "Full name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });

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

  const nextStep = (e) => {
    e.preventDefault();
    if (validate()) {
      window.location.href = "/cook/verification";
    }
  };

  return (
    <div className="flex h-screen w-full">
      <div className="relative  flex w-1/2">
        <div className="absolute inset-0 bg-black/30 z-10"></div>
        <img
          src={authimage}
          alt="Delicious food plate"
          className="object-cover"
          sizes="100%"
        />
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white p-12">
          <h2 className="text-4xl font-bold mb-4">Hello, Friends</h2>
          <p className="text-center mb-2">Enter your Personal Details</p>
          <p className="text-center mb-8">Start your journey with us</p>
          <Link
            to="/cook/login"
            className="bg-white text-black px-8 py-3 rounded hover:bg-gray-100 transition-colors"
          >
            {" "}
            Login
          </Link>
        </div>
      </div>
      {/* Right Side Text */}
      <div className="w-full md:w-1/2 flex flex-col py-30  overflow-y-auto">
        <div className="max-w-md mx-auto w-full">
          <h1 className="text-3xl font-bold text-[#4b6c1e] mb-8">
            Sign in as Cook
          </h1>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                placeholder="Enter your full name"
                className=" block p-2 w-full rounded border border-gray-300 shadow-sm focus:border-[#4b6c1e] focus:outline-none"
              />
              {errors.fullname && (
                <p className="text-red-500 text-sm mt-1">{errors.fullname}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@gmail.com"
                className=" block p-2 w-full rounded border border-gray-300 shadow-sm focus:border-[#4b6c1e] focus:outline-none"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className=" block p-2 w-full rounded border border-gray-300 shadow-sm focus:border-[#4b6c1e] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}{" "}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <div className="pt-4">
              <button
                type="button"
                onClick={nextStep}
                className="w-full cursor-pointer rounded bg-[#4b6c1e] py-3 text-white transition-colors hover:bg-[#3d5819]"
              >
                Next Step
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
