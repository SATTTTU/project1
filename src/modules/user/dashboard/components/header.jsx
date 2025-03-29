import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart, AiOutlineHeart } from "react-icons/ai";
import { IoMdLogOut } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";
import Logo from "../../../../assets/logo.jpg";
import { useUserLogout } from "../../auth/api/logout";
import { useProfile } from "../../userprofile/api/getProfile";
import { useUserBasket } from "../../cart/hooks/getCartItems";

export const Header = () => {
	const [showProfileMenu, setShowProfileMenu] = useState(false);
	const profileRef = useRef(null);
	const { data: profile, isLoading: isProfileLoading, isError } = useProfile();
	const { mutateAsync: logout, isLoading: isLoggingOut } = useUserLogout();

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (profileRef.current && !profileRef.current.contains(event.target)) {
				setShowProfileMenu(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const toggleProfileMenu = () => {
		setShowProfileMenu(!showProfileMenu);
	};

	const imageUrl = "https://khajabox-bucket.s3.ap-south-1.amazonaws.com/";

	const handleLogout = async () => {
		try {
			await logout();
			localStorage.clear();
			window.location.href = "/login"; // Redirect to login page
		} catch (error) {
			console.error("Logout failed", error);
		}
	};

	const userId = profile?.id;
	console.log("user image", profile?.image_url);
	const { data: cartItems } = useUserBasket(userId);

	const cartItemCount = cartItems?.data?.length || 0;
	return (
		<div className="bg-white shadow-sm sticky top-0 z-50">
			<div className="container mx-auto px-4 py-3">
				<div className="flex items-center justify-between">
					<Link to="/user/dashboard" className="flex items-center">
						<img src={Logo} alt="KhanaBox" className="h-10 w-10 mr-2" />
						<span className="text-2xl font-bold text-[#426B1F]">Khajabox</span>
					</Link>

					<div className="flex items-center space-x-4">
						<Link
							to="/user/cart"
							className="relative p-1 hover:bg-gray-100 rounded-full transition-colors"
						>
							<AiOutlineShoppingCart className="text-3xl text-[#426B1F]" />
							{cartItemCount > 0 && (
								<span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
									{cartItemCount}
								</span>
							)}
						</Link>

						<div className="relative" ref={profileRef}>
							<button
								onClick={toggleProfileMenu}
								className="p-1 hover:bg-gray-100 rounded-full transition-colors"
							>
								<FaUserCircle className="text-3xl text-[#426B1F] cursor-pointer" />
							</button>

							{showProfileMenu && (
								<div className="absolute right-0 lg:p-2 mt-2 w-48 bg-white rounded-md shadow-xl py-1 z-50 border border-slate-200">
									<div className="px-4 flex flex-col items-center justify-center py-3 border-b border-slate-200">
										<img
											src={`${imageUrl}${profile?.image_url}`}
											alt="image"
											className="rounded-full lg:h-30 w-30 h-30  mb-4"
										/>
										{isProfileLoading ? (
											<p className="text-sm text-gray-500">Loading...</p>
										) : isError ? (
											<p className="text-sm text-red-500">
												Error loading profile
											</p>
										) : (
											<>
												<p className="text-sm font-medium text-gray-900">
													{profile.name}
												</p>
												<p className="text-xs text-gray-500 truncate">
													{profile.email}
												</p>
											</>
										)}
									</div>

									<Link
										to="/profile"
										className="flex items-center px-4 py-2 text-sm text-gray-900 hover:bg-gray-200 rounded-sm"
									>
										<FaUserCircle className="mr-3 h-5 w-5 " />
										Your Profile
									</Link>

									<Link
										to="/profile/order"
										className="flex items-center px-4 py-2 text-sm text-gray-900 hover:bg-gray-200 rounded-sm"
									>
										<AiOutlineShoppingCart className="mr-3 h-5 w-5 " />
										Your Orders
									</Link>

									<Link
										to="/profile/wishlist"
										className="flex items-center px-4 py-2 text-sm text-gray-900 hover:bg-gray-200 rounded-sm"
									>
										<AiOutlineHeart className="mr-3 h-5 w-5 " />
										Wishlist
									</Link>

									<Link
										to="/profile/settings"
										className="flex items-center px-4 py-2 text-sm text-gray-900 hover:bg-gray-200 rounded-sm"
									>
										<CiSettings className="mr-3 h-5 w-5 " />
										Settings
									</Link>

									<div className="border-t border-slate-200 my-1"></div>

									<button
										onClick={handleLogout}
										disabled={isLoggingOut}
										className="w-full flex text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-200 rounded-sm"
									>
										{" "}
										<IoMdLogOut className="size-5 mr-3" />
										{isLoggingOut ? "Logging out..." : "Sign Out"}
									</button>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
