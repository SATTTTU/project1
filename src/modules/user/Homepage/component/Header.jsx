import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
	AiOutlineShoppingCart,
	AiOutlineUser,
	AiOutlineLogout,
	AiOutlineHeart,
} from "react-icons/ai";
import { FaUserCircle, FaUser } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";
import { useSelector } from "react-redux";
import Logo from "../../../../assets/logo.jpg";
import { useProfile } from "../../Profile/api/getProfile";

export const Header = () => {
	const cartItems = useSelector((store) => store.cart.items);
	const [showProfileMenu, setShowProfileMenu] = useState(false);
	const profileRef = useRef(null);
	const { data: user } = useProfile();
	console.log(user)

	const getTotalCartItems = () => {
		return cartItems.reduce((total, item) => total + item.quantity, 0);
	};

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

	return (
		<div className="bg-white shadow-sm sticky top-0 z-50">
			<div className="container mx-auto px-4 py-3">
				<div className="flex items-center justify-between">
					<Link to="/user/dashboard" className="flex items-center">
						<img src={Logo} alt="KhanaBox" className="h-10 w-10 mr-2" />
						<span className="text-2xl font-bold text-[#426B1F]">KhanaBox</span>
					</Link>

					<div className="flex items-center space-x-4">
						<button className="px-4 py-1.5 border border-gray-300 rounded-full text-sm hover:bg-gray-50 transition-colors">
							Track Order
						</button>

						<Link
							to="/user/cart"
							className="relative p-1 hover:bg-gray-100 rounded-full transition-colors"
						>
							<AiOutlineShoppingCart className="text-3xl text-[#426B1F]" />
							{getTotalCartItems() > 0 && (
								<span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
									{getTotalCartItems()}
								</span>
							)}
						</Link>

						<div className="relative" ref={profileRef}>
							<button
								onClick={toggleProfileMenu}
								className="p-1 hover:bg-gray-100 rounded-full transition-colors"
							>
								<FaUserCircle className="text-3xl text-[#426B1F]" />
							</button>

							{showProfileMenu && (
								<div className="absolute right-0 lg:p-2 mt-2 w-48 bg-white rounded-md shadow-xl py-1 z-50 border border-slate-200">
									<div className="px-4 flex flex-col items-center justify-center py-3 border-b border-slate-200">
										<p className="text-sm  font-medium text-gray-900">
											{/* {user.image_url} */}
											<FaUserCircle className="text-3xl text-[#426B1F]" />
										</p>
										<p className="text-sm  font-medium text-gray-900">
											{user?.name}
										</p>
										<p className="text-xs text-gray-500 truncate">
										{user?.email}
										</p>
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

									<Link
										to="/"
										className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-200 rounded-sm"
									>
										<AiOutlineLogout className="mr-3 h-5 w-5" />
										Sign out
									</Link>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
