import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LoginSection } from "../Login/LoginSection";
import { RegisterSection } from "../Register/RegisterSection";

export const AuthPage = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const [isSignUp, setIsSignUp] = useState(location.pathname === "/user/register");

	useEffect(() => {
		setIsSignUp(location.pathname === "/user/register");
	}, [location.pathname]);

	return (
		<div className="relative w-full h-screen overflow-hidden">
			<div
				className={`flex w-[200%] h-full transition-transform duration-500 ease-in-out ${
					isSignUp ? "-translate-x-1/2" : "translate-x-0"
				}`}
			>
				<div className="w-1/2 flex-shrink-0">
					<LoginSection setIsSignUp={() => navigate("/user/register")} />
				</div>
				<div className="w-1/2 flex-shrink-0">
					<RegisterSection setIsSignUp={() => navigate("/user/login")} />
				</div>
			</div>
		</div>
	);
};
