
import { useState } from "react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import Image from "../../../../../assets/healthy.jpg";

const LoginForm = () => {
	const [isSignUp, setIsSignUp] = useState(false);
	const [rememberMe, setRememberMe] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");

	const handleSignIn = (e) => {
		e.preventDefault();
		console.log("Signing in with:", { email, password, rememberMe });
	};

	const handleSignUp = (e) => {
		e.preventDefault();
		console.log("Signing up with:", { name, email, password });
	};

	return (
		<div className="flex justify-center items-center w-screen h-screen bg-gray-100 px-2">
			<div className="relative w-full h-full bg-white shadow-lg rounded-lg overflow-hidden flex border border-gray-300">
				{/* Sign in Form */}
				<div
					className={`w-1/2 p-8 transition-all duration-500 ${
						isSignUp ? "opacity-0" : "opacity-100"
					}`}
				>
					<form onSubmit={handleSignIn} className="max-w-md mx-auto pt-40">
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
							<div>
								<label className="block text-sm text-gray-600 mb-1">
									E-mail
								</label>
								<input
									type="email"
									placeholder="example@gmail.com"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
									required
								/>
							</div>

							<div>
								<label className="block text-sm text-gray-600 mb-1">
									Password
								</label>
								<div className="relative">
									<input
										type="password"
										placeholder="••••••••"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
										required
									/>
								</div>
							</div>

							<div className="flex items-center justify-between">
								<label className="flex items-center">
									<input
										type="checkbox"
										checked={rememberMe}
										onChange={(e) => setRememberMe(e.target.checked)}
										className="rounded border-gray-300 text-green-600 focus:ring-green-500"
									/>
									<span className="ml-2 text-sm text-gray-600">
										Remember me
									</span>
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

				{/* Sign In Form */}

				<div
					className={`w-1/2 p-20 lg:p-8 transition-all duration-500 ${
						!isSignUp ? "opacity-0 " : "opacity-100 "
					}`}
				>
					<form onSubmit={handleSignUp} className="max-w-md mx-auto pt-30">
						<h1 className="text-4xl font-semibold text-gray-800 mb-4">
							Create Account
						</h1>

						<div className="space-y-3">
							<label className="block text-sm text-gray-600 mb-1">Name</label>

							<input
								type="text"
								placeholder="Name"
								value={name}
								onChange={(e) => setName(e.target.value)}
								className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
								required
							/>
							<label className="block text-sm text-gray-600 mb-1">E-mail</label>

							<input
								type="email"
								placeholder="Email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
								required
							/>
							<label className="block text-sm text-gray-600 mb-1">
								Password
							</label>

							<input
								type="password"
								placeholder="Password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
								required
							/>
						</div>

						<button
							type="submit"
							className="bg-[#426B1F] text-white px-4 py-2 rounded-md mt-6 w-full hover:bg-green-900 transition-colors"
						>
							Sign Up
						</button>
						<div className="relative mt-3">
							<div className="absolute inset-0 flex items-center">
								<div className="w-full border-t border-gray-300"></div>
							</div>
							<div className="relative flex justify-center text-sm">
								<span className="px-2 bg-white text-gray-500">OR</span>
							</div>
						</div>

						<button
							type="button"
							className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2 hover:bg-gray-50 transition-colors mt-2"
						>
							<FcGoogle className="text-xl" />
							<span className="text-gray-600">Continue with Google</span>
						</button>
					</form>
				</div>

				{/* Overlay Panel */}
				<div
					style={{
						backgroundImage: `url(${Image})`,

						backgroundSize: "cover",
						backgroundPosition: "center",
						backgroundRepeat: "no-repeat",
						left: isSignUp ? "0%" : "50%",
					}}
					className="absolute inset-0 w-1/2 h-full  text-white flex flex-col justify-center items-center transition-all duration-500"
					// className="absolute inset-0  w-1/2 h-full text-white flex flex-col justify-center items-center transition-all duration-700 ease-in-out"
				>
					<div className="absolute inset-0  bg-opacity-410"></div>
					<div className="relative z-10 text-center px-8">
						<h1 className="text-6xl font-bold mb-3">
							{isSignUp ? "Welcome Back!" : "Hello, Friends"}
						</h1>
						<p className="text-center text-lg max-w-md mx-auto">
							{isSignUp
								? "To keep connected with us, please sign in with your personal info."
								: "Enter your Personal Details\nStart journey with us"}
						</p>
						<button
							onClick={() => setIsSignUp(!isSignUp)}
							className="mt-8  text-white bg-green-900 text-xl  px-8 py-3 rounded-md transition-all"
						>
							{isSignUp ? "Sign In" : "Sign up"}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginForm;
