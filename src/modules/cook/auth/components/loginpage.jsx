import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { InputField } from "@/components/ui/inputfield/InputField";
import { useLoginFormik } from "../formik/useLogin";

export const LoginForm = () => {
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState("");

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const { formik, isLoggingIn } = useLoginFormik({
    mutationConfig: {
      onSuccess: (data) => {
        console.log("Login successful:", data);
        
        // Store user data in localStorage
        const userData = {
          id: data.id,
          name: data.name,
          email: data.email
        };
        
        // If remember me is checked, store in localStorage
        // Otherwise, use sessionStorage (clears on browser close)
        if (rememberMe) {
          localStorage.setItem('userData', JSON.stringify(userData));
        } else {
          sessionStorage.setItem('userData', JSON.stringify(userData));
        }
        
        // Store token if available
        if (data.token) {
          localStorage.setItem('authToken', data.token);
        }
        
        navigate("/cook/dashboard");
      },
      onError: (error) => {
        console.error("Login failed:", error);
        
        // Extract the error message from the API response
        if (error.response && error.response.data && error.response.data.error) {
          setApiError(error.response.data.error);
        } else {
          setApiError("Login failed. Please try again.");
        }
      },
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      <div className="text-center mb-6">
        {/* Header content can go here */}
      </div>
      
      {/* Display API error message */}
      {apiError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{apiError}</span>
        </div>
      )}

      <div className="space-y-4">
        <InputField
          label="Email"
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && formik.errors.email}
        />
        
        <div className="relative">
          <InputField
            label="Password"
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && formik.errors.password}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-9 text-gray-500"
          >
            {showPassword ? 
              <FiEyeOff size={20} fill="none" stroke="currentColor" /> : 
              <FiEye size={20} fill="none" stroke="currentColor" />
            }
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="rounded border-gray-300 text-green-600 focus:ring-green-500"
          />
          <span>Remember me</span>
        </label>
        
        <Link to="/cook/forgetpassword" className="text-sm text-[#4b6c1e] hover:underline">
          Forgot Password?
        </Link>
      </div>

      <button
        type="submit"
        disabled={isLoggingIn}
        className="w-full py-2 px-4 bg-[#4b6c1e] hover:bg-green-700 text-white rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      >
        {isLoggingIn ? "Signing in..." : "Sign in"}
      </button>

      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/cook/preregister")}
            className="text-green-700 font-medium hover:underline"
          >
            Register now
          </button>
        </p>
      </div>
    </form>
  );
};