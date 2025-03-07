import React from "react";
import { Link } from "react-router-dom";
import {
  FaClock,
  FaDollarSign,
  FaHome,
  FaShoppingBag,
  FaUser,
  FaUtensils,
} from "react-icons/fa";

export const Sidebar = ({ sidebarOpen }) => {
  return (
    <aside
      className={`${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } fixed inset-y-0 z-10 mt-16 w-64  bg-white transition-transform md:static md:translate-x-0`}
    >
      <div className="flex h-full flex-col p-4">
        <nav className="space-y-1">
          <Link
            to={"/cook/homepage"}
            className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            <FaHome className="mr-3 h-5 w-5" />
            Home
          </Link>
          <Link
            to={"/cook/profile"}
            className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            <FaUser className="mr-3 h-5 w-5" />
            Profile
          </Link>
          <Link
            to={"/cook/orderpage"}
            className="flex items-center rounded-md px-3 py-2 text-sm font-medium bg-[#426B1F] text-white"
          >
            <FaShoppingBag className="mr-3 h-5 w-5" />
            Orders
          </Link>
          <Link
            to={"/cook/earnings"}
            className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            <FaDollarSign className="mr-3 h-5 w-5" />
            Earnings
          </Link>
          <Link
            href="/history"
            className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            <FaClock className="mr-3 h-5 w-5" />
            History
          </Link>
          <Link
            href="/menu"
            className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            <FaUtensils className="mr-3 h-5 w-5" />
            Menu
          </Link>
        </nav>
      </div>
    </aside>
  );
};
