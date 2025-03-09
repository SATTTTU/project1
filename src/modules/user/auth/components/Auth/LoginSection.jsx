import { useState } from "react";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { FcGoogle } from "react-icons/fc";
import { signInSchema } from "../../../../../modules/user/auth/formik/schema/authSchema";
import { Link } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Image from "../../../../../assets/UserImages/login.jpg";

import { InputField } from "./InputField";

export const LoginSection = ({ setIsSignUp }) => {
	const navigate = useNavigate();
	const [rememberMe, setRememberMe] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: toFormikValidationSchema(signInSchema),
		onSubmit: (values) => {
			// navigate("/user/home");
			console.log("Login Data Submitted:", values);
		},
	});

	return (
		<div className="flex flex-col md:flex-row h-screen w-full">
			<div className="flex flex-col justify-center items-center mx-auto mt-20   md:w-1/2  ">
				<form
					onSubmit={formik.handleSubmit}
					className="w-full md:w-2/3 mx-auto flex flex-col justify-center"
				>
					<h1 className="text-4xl lg:text-5xl font-bold text-[#426B1F] mb-6">
						Sign in as User
					</h1>
			

					<div className="space-y-4">
						<InputField
							label="E-mail"
							name="email"
							type="email"
							{...formik.getFieldProps("email")}
							error={formik.touched.email && formik.errors.email}
						/>
						<div className="relative">
							<InputField
								label="Password"
								name="password"
								type={showPassword ? "text" : "password"}
								{...formik.getFieldProps("password")}
								error={formik.touched.password && formik.errors.password}
							/>
							<button
								type="button"
								onClick={togglePasswordVisibility}
								className="absolute right-3 top-10 text-gray-500"
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
							to="/user/forgotpassword"
							className="text-sm text-[#426B1F] hover:underline"
						>
							Forgot Password?
						</Link>
					</div>
					<button
						type="submit"
						className="w-full bg-[#426B1F] text-white py-2 rounded-md hover:bg-[#436b1fe5] transition mt-4"
					>
						Sign in
					</button>
					<p className="text-md mt-3 text-center text-black mb-6">
						Don't have an account?{" "}
						<button
							onClick={() => navigate("/user/register")}
							className="text-green-700 font-medium hover:underline"
						>
							Register now
						</button>
					</p>

					<div className="relative my-6">
						<div className="absolute inset-0 flex items-center">
							<div className="w-full border-t border-gray-300"></div>
						</div>
						<div className="relative flex justify-center text-sm">
							<span className="px-2 bg-white text-gray-500">OR</span>
						</div>
					</div>

					<button
						type="button"
						className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2 hover:bg-gray-50 transition"
					>
						<FcGoogle className="text-xl" />
						<span className="text-gray-600">Continue with Google</span>
					</button>
				</form>
			</div>

			<div className="hidden md:flex w-1/2 relative">
				<img src={Image} alt="Welcome" className="object-cover w-full h-full" />
				<div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white p-6">
					<h2 className="text-6xl font-bold mb-4">Hello, Friends</h2>
					<p className="text-center text-2xl mb-2">Enter your Personal Details</p>
					<p className="text-center text-2xl mb-4">Start journey with us</p>

					<Link
						to="/user/register"
						className="bg-white text-black px-6 py-3 text-xl rounded hover:bg-gray-100 transition"
					>
						Sign Up
					</Link>
				</div>
			</div>
		</div>
	);
};
