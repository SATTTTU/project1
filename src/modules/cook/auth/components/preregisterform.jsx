import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { InputField } from "@/components/ui/inputfield/InputField";
import { useCookRegisterFormik } from "../formik/usefirstregister";

export const PreRegisterForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  
  const { formik, isRegistering } = useCookRegisterFormik({
		mutationConfig: {
			onSuccess: (data) => {
				console.log("Registration successful:", data);
				// navigate("/cook/verification")

				// Store user data in localStorage
				const userData = {
					id: data.id,
					name: data?.name,
					email: data.email,
				};

				// Store user data in localStorage for persistence across the application
				localStorage.setItem("userData", JSON.stringify(userData));

				// Store the cook_id specifically - this is what the document upload form needs
				if (data.id) {
					localStorage.setItem("cook_id", data.id);
				}

				// For backwards compatibility, also store as clientId if that's what the server returns
				if (data.clientId) {
					localStorage.setItem("cookClientId", data.clientId);
					// Also store as cook_id if that's the field your document form expects
					localStorage.setItem("cook_id", data.clientId);
				}

				if (data.token) {
					localStorage.setItem("authToken", data.token);
				}

				// Navigate to verification page after successful registration
				navigate("/cook/verification");
			},
			onError: (error) => {
				console.error("Registration failed:", error);
			},
		},
	});

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	return (
		<div className="bg-white p-8 rounded-lg  w-full max-w-md">
			<h2 className="text-3xl text-[#0f9300d1] font-bold mb-6 text-center">
				Sign up as cook
			</h2>

			{formik.status && !formik.status.success && (
				<div className="bg-red-100 p-3 rounded mb-4 text-red-700">
					{formik.errors.submit || "Registration failed. Please try again."}
				</div>
			)}

			<form onSubmit={formik.handleSubmit} className="space-y-4">
				<InputField
					label="Full Name"
					id="name"
					name="name"
					type="text"
					placeholder="Enter your full name"
					{...formik.getFieldProps("name")}
					error={formik.touched?.name && formik.errors?.name}
				/>

				<InputField
					label="Email"
					id="email"
					name="email"
					type="email"
					placeholder="Enter your email"
					{...formik.getFieldProps("email")}
					error={formik.touched.email && formik.errors.email}
				/>

				<div className="relative">
					<InputField
						label="Password"
						id="password"
						name="password"
						type={showPassword ? "text" : "password"}
						placeholder="Create a password"
						{...formik.getFieldProps("password")}
						error={formik.touched.password && formik.errors.password}
					/>
					<button
						type="button"
						onClick={togglePasswordVisibility}
						className="absolute right-3 top-9 text-gray-500"
					>
						{showPassword ? <FiEyeOff /> : <FiEye />}
					</button>
				</div>

				<button
					type="submit"
					disabled={isRegistering || formik.isSubmitting}
					className="w-full bg-[#0f9300d1] text-white py-2 rounded-md hover:bg-[#426B1G] transition duration-300 disabled:bg-blue-400"
				>
					{isRegistering ? "Signing Up..." : "Sign Up"}
				</button>
			</form>

			<p className="mt-4 text-center text-gray-600">
				Already have an account?{" "}
				<Link to="/cook/login" className="text-[#0f9300d1] hover:underline">
					Login Now
				</Link>
			</p>
		</div>
	);
};