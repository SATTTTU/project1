import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useLoginFormik } from "../../../../modules/user/auth/formik/useLoginFormik";
import { InputField } from "@/components/ui/inputfield/InputField";

export const LoginForm = () => {
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const {formik } = useLoginFormik({
	  mutationConfig: {
		  onSuccess: (data) => {
		  console.log("Login successful:", data);
		},
		onError: (error) => {
		  console.error("Login failed:", error);
		},
	  },}
  );

  return (
		<form
			onSubmit={formik.handleSubmit}
			className="w-full md:w-2/3 mx-auto flex flex-col justify-center"
		>
			<h1 className="text-3xl lg:text-4xl font-bold text-[#426B1F] mb-6">
				Sign in as User
			</h1>

			<div className="space-y-4">
				<InputField
					label="E-mail"
					name="email"
					type="email"
					value={formik.values.email}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					error={formik.touched.email && formik.errors?.email}
				/>
				<div className="relative">
					<InputField
						label="Password"
						name="password"
						type={showPassword ? "text" : "password"}
						value={formik.values.password}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.password && formik.errors?.password}
					/>
					<button
						type="button"
						onClick={togglePasswordVisibility}
						className="absolute right-3 top-9 text-gray-500 cursor-pointer"
					>
						{showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
					</button>
				</div>
			</div>

			<div className="flex items-center justify-between mt-6">
				<label className="flex items-center">
					<input
						type="checkbox"
						checked={rememberMe}
						onChange={(e) => setRememberMe(e.target.checked)}
						className="rounded border-gray-300 text-green-600 focus:ring-green-500"
					/>
					<span className="ml-2 text-sm text-gray-600">Remember me</span>
				</label>
				<Link
					to="/forgotpassword"
					className="text-sm text-[#426B1F] hover:underline"
				>
					Forgot Password?
				</Link>
			</div>

			<button
				type="submit"
				// disabled={isLoggingIn || !formik.isValid || formik.isSubmitting}
				className="w-full bg-[#426B1F] text-white py-2 text-lg rounded-md hover:bg-[#436b1fe5] transition mt-4"
			>
				Sign in
			</button>
			{formik.errors.submit && (
  <div className="text-red-600 text-sm mt-2 text-center">
    {formik.errors.submit}
  </div>
)}


			<p className="text-md mt-3 text-center text-black mb-6">
				Don't have an account?{" "}
				<button
					onClick={() => navigate("/register")}
					className="text-green-700 font-medium hover:underline cursor-pointer"
				>
					Register now
				</button>
			</p>
		</form>
	);
};
