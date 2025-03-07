import { useState } from "react";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { FcGoogle } from "react-icons/fc";
import { signInSchema } from "../../../../../modules/user/auth/formik/schema/authSchema";
import { Link } from "react-router-dom";

import { InputField } from "./InputField";

const LoginSection = ({ setIsSignUp }) => {
	const [rememberMe, setRememberMe] = useState(false);

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: toFormikValidationSchema(signInSchema),
		onSubmit: (values) => {
			console.log("Login Data Submitted:", values);
		},
	});

	return (
		<div className={`w-1/2 p-8 transition-all duration-500`}>
			<form onSubmit={formik.handleSubmit} className="max-w-md mx-auto pt-40">
				<h1 className="text-4xl font-semibold text-gray-800 mb-2">
					Sign in as User
				</h1>
				<p className="text-sm text-gray-600 mb-6">
					Don't have an account?{" "}
					<button
						type="button"
						onClick={() => setIsSignUp(true)}
						className="text-green-700 font-medium"
					>
						Create now
					</button>
				</p>

				<div className="space-y-4">
					<InputField
						label="E-mail"
						name="email"
						type="email"
						value={formik.values.email}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.email && formik.errors.email}
						autoComplete="off"
					/>

					<InputField
						label="Password"
						name="password"
						type="password"
						value={formik.values.password}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.password && formik.errors.password}
					/>
					<div className="flex items-center justify-between">
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
							className="text-sm text-green-700 hover:underline"
						>
							Forgot Password?
						</Link>
					</div>

					<button
						type="submit"
						className="w-full bg-green-700 text-white py-2 rounded-md hover:bg-green-800 transition-colors"
					>
						Sign in
					</button>

					<div className="relative">
						<div className="absolute inset-0 flex items-center">
							<div className="w-full border-t border-gray-300"></div>
						</div>
						<div className="relative flex justify-center text-sm">
							<span className="px-2 bg-white text-gray-500">OR</span>
						</div>
					</div>

					<button
						type="button"
						className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2 hover:bg-gray-50 transition-colors"
					>
						<FcGoogle className="text-xl" />
						<span className="text-gray-600">Continue with Google</span>
					</button>
				</div>
			</form>
		</div>
	);
};

export default LoginSection;
