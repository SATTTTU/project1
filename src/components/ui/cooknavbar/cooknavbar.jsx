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
import { Sidebar } from "../sideBar/sidebar";
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

const CookNavBAr = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [count, setCount] = useState(3);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const {data:cook}= useProfile();
  console.log("cookss***",cook.name)
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
  const { logout, isLoading} = useCookLogout();

  const handleLogout = async () => {
    try {
      await logout();
      console.log("Logout successful");
      localStorage.clear()
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

  // Notification data
  const notifications = [
    { id: 1, message: "New order received: #ORD-7832", time: "2 min ago" },
    {
      id: 2,
      message: "Order #ORD-7830 is waiting to be prepared",
      time: "5 min ago",
    },
    {
      id: 3,
      message: "Delivery for #ORD-7829 is on the way",
      time: "10 min ago",
    },
  ];

  const [notificationOpen, setNotificationOpen] = useState(false);

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
            <Sidebar sidebarOpen={sidebarOpen} />
          </button>

          <Link
            to="/cook/homepage"
            className="flex items-center gap-2 text-xl font-bold text-[#426B1F] cursor-pointer"
          >
            <ChefHat className="h-7 w-7" />
            <span>KhajaBox</span>
          </Link>
        </div>

        {/* Search box */}
        <div className="hidden md:flex relative max-w-md flex-1 mx-8">
          <div className="relative w-full"></div>
        </div>

        <div className="flex items-center gap-2">
          {/* Status indicator */}
          <div className="hidden md:flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
            <Coffee className="h-4 w-4" />
            <span>Kitchen Active</span>
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              className="relative rounded-full cursor-pointer p-2 hover:bg-gray-100 transition-colors"
              onClick={() => {
                setNotificationOpen(!notificationOpen);
                setCount(0);
              }}
            >
              <Bell className="h-6 w-6" />
              {count > 0 && (
                <span className="absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs text-white animate-pulse">
                  {count}
                </span>
              )}
              <span className="sr-only">Notifications</span>
            </button>

            {/* Notifications dropdown */}
            {notificationOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-3 border-b border-gray-200">
                  <h3 className="text-sm font-semibold">Notifications</h3>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className="p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                      >
                        <p className="text-sm">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {notification.time}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-sm text-gray-500">
                      No new notifications
                    </div>
                  )}
                </div>
                <div className="p-2 text-center border-t border-gray-200">
                  <button className="text-xs text-[#426B1F] font-medium hover:underline">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User profile */}
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-2 rounded-full p-1 pl-2 hover:bg-gray-100 transition-colors"
            >
              <div className="hidden md:block text-right mr-2">
                <div className="text-lg font-medium">{cook.name}</div>
                <div className="text-xs text-gray-500">Cook</div>
              </div>
              <div className="h-8 w-8 rounded-full bg-[#426B1F] text-white flex items-center justify-center">
                <User className="h-5 w-5" />
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
