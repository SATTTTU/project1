import { FaUserCircle } from "react-icons/fa";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { User, Settings, Bell, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
	const navigate = useNavigate();
	const [isOpen, setIsOpen] = useState(false);

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	const closeDropdown = (e) => {
		if (!e.target.closest(".profile-dropdown")) {
			setIsOpen(false);
		}
	};

	useEffect(() => {
		document.addEventListener("click", closeDropdown);
		return () => {
			document.removeEventListener("click", closeDropdown);
		};
	}, []);

	return (
		<div className="relative profile-dropdown">
			<button
				onClick={toggleDropdown}
				className="flex items-center space-x-2 focus:outline-none"
			>
				<div className="w-10 h-10 rounded-full overflow-hidden">
					<FaUserCircle className="w-full h-full p-1 text-slate-800" />
				</div>
			</button>

			{isOpen && (
				<div className="absolute right-0 mt-2 w-80 bg-gray-100 rounded-lg shadow-lg py-2 z-50">
					{" "}
					<div className="px-4 py-3 border-b border-gray-100">
						<div className="flex items-center space-x-3">
							<div className="w-12 h-12 rounded-full overflow-hidden">
								<FaUserCircle className="w-full h-full p-1 text-slate-800" />
							</div>
							<div>
								<h3 className="text-lg font-semibold text-gray-800">
									Your name
								</h3>
								<p className=" text-gray-500">yourname@gmail.com</p>
							</div>
						</div>
					</div>
					<div className="py-2">
						<Link
							to="/user/profileEdit"
							// onClick={()=> navigate("/user/profileEdit")}/
							className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
						>
							<User className="w-4 h-4" />
							<span>My Profile</span>
						</Link>

						<Link
							to="/settings"
							className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
						>
							<Settings className="w-4 h-4" />
							<span>Settings</span>
						</Link>

						<div className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
							<div className="flex items-center space-x-3">
								<Bell className="w-4 h-4" />
								<span>Notification</span>
							</div>
							<span className="text-xs text-green-600">Allow</span>
						</div>

						<button
							onClick={() => navigate("/user/login")}
							className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
						>
							<LogOut className="w-4 h-4" />
							<span>Log Out</span>
						</button>
					</div>
				</div>
			)}
		</div>
	);
};
