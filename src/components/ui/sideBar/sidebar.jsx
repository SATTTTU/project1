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

export const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
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

  return (
    <aside
      className={`${
        sidebarOpen
          ? "translate-x-0 opacity-100"
          : "-translate-x-full opacity-0 md:opacity-100"
      } fixed inset-y-0 z-10 w-64 bg-white transition-all duration-300 ease-in-out md:static md:translate-x-0 left-2`}
    >
      <div className="flex h-full flex-col p-4">
        <nav className="space-y-8">
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
        </nav>
      </div>
    </aside>
  );
};
