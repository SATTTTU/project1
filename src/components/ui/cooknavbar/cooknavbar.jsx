import {
	Bell,
	Menu,
	User,
	LogOut,
	Settings,
	ChefHat,
	Coffee,
	Search,
} from "lucide-react";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
	FaClock,
	FaDollarSign,
	FaHome,
	FaShoppingBag,
	FaUser,
	FaUtensils,
} from "react-icons/fa";
import { useCookLogout } from "@/modules/cook/auth/api/cooklogout";
import { useProfile } from "@/modules/cook/profile/api/getcookprofile";
import khajaboxlogo from "@/assets/unnamed.png";
import Profile from "../../../assets/defaultProfile.jpg";

const CookNavBAr = () => {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [count, setCount] = useState(3);
	const [userMenuOpen, setUserMenuOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const location = useLocation();
	const { data: cook } = useProfile();
	console.log("cookss***", cook);
	const [activeItem, setActiveItem] = useState(() => {
		// Initialize based on current path
		const path = location.pathname;
		if (path.includes("/cook/orderpage")) return "/cook/orderpage";
		if (path.includes("/cook/homepage")) return "/cook/homepage";
		if (path.includes("/cook/profile")) return "/cook/profile";
		if (path.includes("/cook/earnings")) return "/cook/earnings";
		if (path.includes("/cook/history")) return "/cook/history";
		if (path.includes("/cook/menu")) return "/cook/menu";
		return "";
	});
	const { logout, isLoading } = useCookLogout();

	const handleLogout = async () => {
		try {
			await logout();
			console.log("Logout successful");
			localStorage.clear();
			window.location.href = "/";
		} catch (err) {
			console.error("Logout failed", err);
		}
	};

	const handleItemClick = (path) => {
		setActiveItem(path);
		setSidebarOpen(false);
	};

  const getItemClass = (path) => {
    const baseClass =
      "flex items-center rounded-md px-3 py-2 text-sm font-medium";
    if (activeItem === path) {
      return `${baseClass} bg-[#426B1F] text-white`;
    }
    return `${baseClass} text-gray-700 hover:bg-gray-100`;
  };
	const imageBaseUrl = "https://khajabox-bucket.s3.ap-south-1.amazonaws.com/";

	return (
		<div className="sticky top-0 z-50">
			<header className="flex h-16 items-center justify-between border-b px-4 md:px-6 bg-white shadow-sm">
				<div className="flex items-center gap-4">
					<button
						onClick={() => setSidebarOpen(!sidebarOpen)}
						className="md:hidden rounded-md p-2 hover:bg-gray-100 transition-colors"
					>
						<Menu className="h-6 w-6" />
						<span className="sr-only">Toggle sidebar</span>
					</button>

					<Link
						to="/cook/homepage"
						className="flex items-center gap-2 text-xl font-bold text-[#426B1F] hover:text-[#2d4e14] transition duration-200"
					>
						<img
							src={khajaboxlogo}
							alt="KhajaBox Logo"
							className="h-8 w-auto"
						/>
						<span>KhajaBox</span>
					</Link>
				</div>

				{/* Search box */}
				<div className="hidden md:flex relative max-w-md flex-1 mx-8">
					<div className="relative w-full"></div>
				</div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-2 rounded-full p-1 pl-2 hover:bg-gray-100 transition-colors"
            >
              <div className="hidden md:block text-right mr-2">
                <div className="text-lg font-medium">{cook?.name}</div>
                
              </div>
              <div className="h-8 w-8 rounded-full bg-[#426B1F] text-white flex items-center justify-center">
                    <img
                          src={
                            cook?.image_url
                            ? `${imageBaseUrl}${cook?.image_url}`
                            : Profile
                          }
                          alt="Profile"
                          className="rounded-full h-10 w-10 object-cover shadow-md border-2 border-white transition-all duration-300"
                          />
              </div>
            </button>

						{/* User dropdown menu */}
						{userMenuOpen && (
							<div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
								<div className="p-2">
									<Link
										to={"/cook/homepage"}
										onClick={() => handleItemClick("/cook/homepage")}
										className={getItemClass("/cook/homepage")}
									>
										<FaHome className="mr-3 h-5 w-5" />
										Home
									</Link>
									<Link
										to={"/cook/profile"}
										onClick={() => handleItemClick("/cook/profile")}
										className={getItemClass("/cook/profile")}
									>
										<FaUser className="mr-3 h-5 w-5" />
										Profile
									</Link>
									<Link
										to={"/cook/orderpage"}
										onClick={() => handleItemClick("/cook/orderpage")}
										className={getItemClass("/cook/orderpage")}
									>
										<FaShoppingBag className="mr-3 h-5 w-5" />
										Orders
									</Link>
									<Link
										to={"/cook/earnings"}
										onClick={() => handleItemClick("/cook/earnings")}
										className={getItemClass("/cook/earnings")}
									>
										<FaDollarSign className="mr-3 h-5 w-5" />
										Earnings
									</Link>
									<Link
										to={"/cook/history"}
										onClick={() => handleItemClick("/cook/history")}
										className={getItemClass("/cook/history")}
									>
										<FaClock className="mr-3 h-5 w-5" />
										History
									</Link>
									<Link
										to={"/cook/menu"}
										onClick={() => handleItemClick("/cook/menu")}
										className={getItemClass("/cook/menu")}
									>
										<FaUtensils className="mr-3 h-5 w-5" />
										Menu
									</Link>

									<div className="border-t my-1"></div>
									<Link
										to={"/"}
										onClick={handleLogout}
										className={`w-full flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 text-sm text-red-600 ${
											isLoading ? "pointer-events-none opacity-50" : ""
										}`}
									>
										<LogOut className="h-4 w-4" />
										<span>{isLoading ? "Logging out..." : "Logout"}</span>
									</Link>
								</div>
							</div>
						)}
					</div>
				</div>
			</header>

			{/* Mobile search box - shown only on mobile */}
			<div className="md:hidden p-2 bg-white border-b">
				<div className="relative w-full">
					<Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
					<input
						type="text"
						placeholder="Search orders, recipes..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="w-full rounded-full border border-gray-300 pl-10 pr-4 py-2 text-sm focus:border-[#426B1F] focus:outline-none focus:ring-1 focus:ring-[#426B1F]"
					/>
				</div>
			</div>
		</div>
	);
};

export default CookNavBAr;
