import { useFormik } from "formik";
import { useState } from "react";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { InputField } from "./InputField";
import { FcGoogle } from "react-icons/fc";

import { FiEye, FiEyeOff } from "react-icons/fi";
import Image from "../../../../../assets/UserImages/login.jpg";
import { Link, useNavigate } from "react-router-dom";
import { signUpSchema } from "../../formik/schema/authschema";

export const RegisterSection = ({ setIsSignUp }) => {
  const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false);

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const formik = useFormik({
		initialValues: {
			name: "",
			email: "",
			password: "",
		},
		validationSchema: toFormikValidationSchema(signUpSchema),
		onSubmit: (values) => {
			console.log("Registration Data Submitted:", values);
		},
	});

	return (
		<div className="flex flex-col md:flex-row h-screen w-full">
			<div className="hidden md:flex  relative w-1/2">
				<img
					src={Image}
					alt="User Login"
					className="w-full h-full object-cover"
				/>
				<div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white bg-opacity-50 p-12">
					<h2 className="text-6xl font-bold mb-4">Welcome, Friends</h2>
					<p className="text-center text-2xl mb-2">
						To keep connected with us please{" "}
					</p>
					<p className="text-center text-2xl mb-8">
						{" "}
						login with your personal info
					</p>
					<Link
						to="/user/login"
						onClick={() => setIsSignUp(true)}
						className="bg-white text-black px-8 text-xl py-3 rounded hover:bg-gray-100 transition"
					>
						Sign in
					</Link>
				</div>
			</div>

			<div className="flex flex-col justify-center items-center w-full md:w-1/2 p-8">
				<form onSubmit={formik.handleSubmit} className="w-full max-w-md">
					<h1 className="text-4xl lg:text-5xl font-bold text-[#426B1F] mb-6 ">
						Create Account
					</h1>

					<div className="space-y-4">
						<InputField
							label="Name"
							name="name"
							type="text"
							value={formik.values.name}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.name && formik.errors?.name}
						/>
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
								className="absolute right-3 top-12 transform -translate-y-1/2 text-gray-500"
							>
								{showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
							</button>
						</div>
					</div>

					<button
						type="submit"
						className="bg-[#426B1F] text-white px-4 py-2 rounded-md mt-6 w-full hover:bg-[#426B1F] transition"
					>
						Sign Up
					</button>
					<p className="text-md mt-3 text-center text-black mb-6">
						Already have an account?{" "}
						<button
            type="submit"
							onClick={() => navigate("/user/login")}
							className="text-green-700 font-medium hover:underline"
						>
							Login Now
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
		</div>
	);
};
