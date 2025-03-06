import React, { useState } from "react";
import { FaEnvelope, FaUser } from "react-icons/fa";
import { FiEye, FiEyeOff } from "react-icons/fi"; // Import Eye Icons
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
      <div className="flex w-full flex-col justify-center px-8 md:w-1/2 lg:px-16">
        <form className="space-y-6">
          <h1 className="mb-10 text-3xl font-bold text-[#4b6c1e]">
            Signup as Cook
          </h1>

          <div className="grid gap-4">
            {[
              { name: "fullname", label: "Full Name", icon: <FaUser /> },
              { name: "email", label: "Email", icon: <FaEnvelope /> },
            ].map((field, idx) => (
              <div key={idx} className="relative w-full">
                <label className="block text-sm font-medium text-gray-700">
                  {field.label}
                </label>
                <div className="relative mt-1">
                  <span className="absolute inset-y-0 right-3 flex items-center text-gray-400">
                    {field.icon}
                  </span>
                  <input
                    type="text"
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className="pl-10 pr-3 block p-2 w-full rounded border border-gray-300 shadow-sm focus:border-[#4b6c1e] focus:outline-none"
                  />
                </div>
                {errors[field.name] && (
                  <p className="text-red-500 text-sm">{errors[field.name]}</p>
                )}
              </div>
            ))}

            {/* Password Field with Toggle Visibility */}
            <div className="relative w-full">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative mt-1">
                <span
                  className="absolute inset-y-0 right-3 flex items-center text-gray-400 cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="pl-10 pr-10 block p-2 w-full rounded border border-gray-300 shadow-sm focus:border-[#4b6c1e] focus:outline-none"
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>
          </div>

          <div className="text-end">
            <button
              type="button"
              onClick={nextStep}
              className="w-full rounded bg-[#4b6c1e] py-3 text-white transition-colors hover:bg-[#3d5819]"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
