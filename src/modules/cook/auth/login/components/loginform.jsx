import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { z } from "zod";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

export const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touchedFields, setTouchedFields] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  // Validation schema
  const formSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user starts typing after an error
    if (touchedFields[name]) {
      validateField(name, value);
    }
  };

  // Handle input blur
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouchedFields((prev) => ({
      ...prev,
      [name]: true,
    }));
    validateField(name, formData[name]); // Validate when field loses focus
  };

  // Validate a single field and update errors
  const validateField = (name, value) => {
    try {
      formSchema.pick({ [name]: true }).parse({ [name]: value });
      setErrors((prev) => ({ ...prev, [name]: undefined })); // Clear error if valid
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors((prev) => ({
          ...prev,
          [name]: error.errors[0].message,
        }));
      }
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Mark all fields as touched
    setTouchedFields({ email: true, password: true });

    try {
      formSchema.parse(formData);
      console.log("Form Submitted:", formData);

      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        navigate("/cook/Homepage");
      }, 1000);
    } catch (error) {
      setIsSubmitting(false);
      if (error instanceof z.ZodError) {
        const errorObj = {};
        error.errors.forEach((err) => {
          errorObj[err.path[0]] = err.message;
        });
        setErrors(errorObj);
      }
    }
  };

  return (
    <>
      {errors.general && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {errors.general}
        </div>
      )}

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
            onBlur={handleBlur}
            placeholder="example@gmail.com"
            className={`w-full rounded border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } px-4 py-3 focus:border-[#4b6c1e] focus:outline-none`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm text-gray-600">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="••••••••"
              className={`w-full rounded border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } px-4 py-3 focus:border-[#4b6c1e] focus:outline-none`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 transition ease-in-out"
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
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
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded cursor-pointer bg-[#4b6c1e] py-3 text-white transition-colors hover:bg-[#3d5819] disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Logging in..." : "Log in"}
        </button>
      </form>

      {/* OR Divider */}
      <div className="my-6 flex items-center">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="mx-4 text-sm text-gray-500">OR</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>
      <div className="flex justify-items-center ">Don't have an account yet? <Link to={"/cook/preregister"}className="text-blue-400 underline pl-2"> Create an account</Link></div>


      
    </>
  );
};
