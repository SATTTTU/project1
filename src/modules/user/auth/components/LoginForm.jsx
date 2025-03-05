import { useState } from "react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
// import LoginImage from "./assets/Login.svg"

const LoginForm = () => {
	const [isSignUp, setIsSignUp] = useState(false);

	return (
		<>
			<div className="flex justify-center items-center h-screen bg-gray-100 px-2">
				<div className="relative w-[800px] h-[500px] bg-white shadow-lg rounded-lg overflow-hidden flex border border-gray-300">
					<div
						className={`w-1/2 p-8 transition-opacity duration-500 ${
							isSignUp ? "opacity-100" : "opacity-0"
						}`}
					>
						<h1 className="text-3xl font-bold mb-6 text-gray-800">
							Create Account
						</h1>
						<div className="flex gap-4 mb-5">
							
							<Link to="/" className="text-red-500 text-3xl">
								<FcGoogle />
							</Link>
						
						</div>
						<span className="text-gray-500">
							or use your email for registration
						</span>
						<input
							type="text"
							placeholder="Name"
							className="block w-full p-2 mt-2 border rounded"
						/>
						<input
							type="email"
							placeholder="Email"
							className="block w-full p-2 mt-2 border rounded"
						/>
						<input
							type="password"
							placeholder="Password"
							className="block w-full p-2 mt-2 border rounded"
						/>
						<button className="bg-green-500 text-white px-4 py-2 rounded mt-4 w-full">
							Sign Up
						</button>
					</div>

					<div
						className={`w-1/2 p-20 lg:p-8 transition-opacity duration-500 ${
							!isSignUp ? "opacity-100" : "opacity-0 "
						}`}
					>
						<h1 className="text-3xl font-bold mb-6 text-gray-800">Sign in as User</h1>
						<div className="flex gap-4 mb-5">
						
							<Link to="/" className="text-red-500 text-3xl">
								<FcGoogle />
							</Link>
						
						</div>
						<span className="text-gray-500">or use your account</span>
						<input
							type="email"
							placeholder="Email"
							className="block w-full p-2 mt-2 border rounded border-slate-700"
						/>
						<input
							type="password"
							placeholder="Password"
							className="block w-full p-2 mt-2 border rounded"
						/>
						<Link to="/" className="text-blue-500 mt-2 inline-block">
							Forgot your password?
						</Link>
						<button className="bg-green-700 text-white px-4 py-2 rounded mt-4 w-full">
							Sign In
						</button>
					</div>

					{/*yo chai  Overlay Panel ho*/}
					<div
						style={{
							// backgroundImage: `url(${LoginImage})`,
							left: isSignUp ? "50%" : "0%",
						}}
						className="absolute bg-green-600 top-0 w-[400px] h-full text-white flex flex-col justify-center items-center transition-all duration-500"
					>
						<h1 className="text-2xl font-bold mb-3">
							{isSignUp ? "Hello, Friend!" : "Welcome Back!"}
						</h1>
						<p className="text-center text-sm px-8">
							{isSignUp
								? "Enter your details and start your journey with us."
								: "To keep connected with us, please sign in."}
						</p>
						<button
							onClick={() => setIsSignUp(!isSignUp)}
							className="border border-white text-white px-6 py-2 rounded-lg mt-6 bg-green-700 hover:bg-green-700 hover:text-red-500 transition-all"
						>
							{isSignUp ? "Sign In" : "Sign Up"}
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default LoginForm;
