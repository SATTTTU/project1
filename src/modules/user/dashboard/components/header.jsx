
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoMdLogOut } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Logo from "../../../../assets/unnamed.png";
import { useUserLogout } from "../../auth/api/logout";
import { useProfile } from "../../userprofile/api/getProfile";
import { useUserCart } from "../../cart/api/getItems";
import { SearchBar } from "./searchBar";
import { CartBadge } from "./cartBadge";
import Profile from "../../../../assets/defaultProfile.jpg";

export const Header = ({ navigate, popularItems, categories, cooks }) => {
	const [showProfileMenu, setShowProfileMenu] = useState(false);
	const [showLogoutModal, setShowLogoutModal] = useState(false);
	const profileRef = useRef(null);
	const imageBaseUrl = "https://khajabox-bucket.s3.ap-south-1.amazonaws.com/";

	const { data: profile, isLoading: isProfileLoading, isError } = useProfile();
	console.log("profile****", profile)
	const { mutateAsync: logout, isLoading: isLoggingOut } = useUserLogout();
	const {
		data: cartItems,
		isLoading: isCartLoading,
		refetch: refetchCart,
	} = useUserCart();

	useEffect(() => {
		const intervalId = setInterval(() => {
			refetchCart();
		}, 30000);
		return () => clearInterval(intervalId);
	}, [refetchCart]);

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

	const confirmLogout = async () => {
		try {
			await logout();
			localStorage.clear();
			window.location.href = "/login";
		} catch (error) {
			console.error("Logout failed", error);
		}
	};

	return (
		<div className="bg-white shadow-sm sticky top-0 z-50">
			<div className="container mx-auto px-4">
				<div className="flex items-center justify-between ">
					<Link to="/dashboard" className="flex items-center">
						<img src={Logo} alt="Khajabox" className="h-8 w-8 mr-2" />
						<span className="text-3xl font-bold text-[#426B1F]">Khajabox</span>
					</Link>

					<div className="hidden lg:block w-full max-w-lg">
						<SearchBar
							navigate={navigate}
							popularItems={popularItems}
							categories={categories}
							cooks={cooks}
						/>
					</div>

					<div className="flex items-center space-x-4">
						<CartBadge cartItems={cartItems} isLoading={isCartLoading} />

						<div className="relative" ref={profileRef}>
						<div
    onClick={toggleProfileMenu}
    className="p-1 rounded-full transition-transform duration-200 hover:scale-105 "
  >
    <img
      src={
        profile?.image_url
          ? `${imageBaseUrl}${profile?.image_url}`
          : Profile
      }
      alt="Profile"
      className="rounded-full h-10 w-10 object-cover shadow-md border-2 border-white transition-all duration-300"
    />
  </div>

  {showProfileMenu && (
    <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl py-4 z-50 border border-gray-200 animate-fade-in">
      <div className="px-6 flex flex-col items-center text-center py-4 border-b border-gray-200">
        <img
          src={
            profile?.image_url
              ? `${imageBaseUrl}${profile?.image_url}`
              : Profile
          }
          alt="Profile"
          className="rounded-full h-20 w-20 object-cover border-1 border-green-500 shadow-lg mb-3 transition-transform duration-300 hover:scale-105"
        />
        {isProfileLoading ? (
          <p className="text-sm text-gray-500">Loading...</p>
        ) : isError ? (
          <p className="text-sm text-red-500">Error loading profile</p>
        ) : (
          <>
            <p className="text-lg font-semibold text-gray-900">{profile.name}</p>
            <p className="text-sm text-gray-500 truncate">{profile.email}</p>
          </>
        )}
      </div>

									<div className="flex flex-col py-2">
										<Link
											to="/profile"
											className="px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-md flex items-center"
										>
											<FaUserCircle className="mr-3" /> Your Profile
										</Link>
										<Link
											to="/profile/order"
											className="px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-md flex items-center"
										>
											<AiOutlineShoppingCart className="mr-3" /> Your Orders
										</Link>
										<Link
											to="/profile/settings"
											className="px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-md flex items-center"
										>
											<CiSettings className="mr-3" /> Settings
										</Link>
									</div>

									<div className="border-t border-gray-200 my-2"></div>

									<button
										onClick={() => setShowLogoutModal(true)}
										className="w-full px-6 py-2 text-red-600 hover:bg-gray-100 flex items-center"
									>
										<IoMdLogOut className="mr-3" /> Sign Out
									</button>
								</div>
							)}
						</div>
					</div>
				</div>

				<div className="lg:hidden">
					<SearchBar
						navigate={navigate}
						popularItems={popularItems}
						categories={categories}
						cooks={cooks}
					/>
				</div>
			</div>

			{showLogoutModal && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-white  bg-opacity-50">
					<div className="bg-white rounded-lg shadow-2xl border border-slate-300 w-full max-w-sm p-6">
						<h2 className="text-lg font-semibold mb-4 text-gray-800">
							Confirm Logout
						</h2>
						<p className="text-gray-600 mb-6">
							Are you sure you want to logout?
						</p>
						<div className="flex justify-end space-x-4">
							<button
								className="px-4 py-2 text-sm text-gray-900 bg-gray-100 rounded hover:bg-gray-200"
								onClick={() => setShowLogoutModal(false)}
							>
								Cancel
							</button>
							<button
								className="px-4 py-2 text-sm text-white bg-red-600 rounded hover:bg-red-700"
								onClick={confirmLogout}
								disabled={isLoggingOut}
							>
								{isLoggingOut ? "Logging out..." : "Logout"}
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
