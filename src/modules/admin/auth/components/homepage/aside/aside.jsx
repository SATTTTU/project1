import React from 'react';
import { MdDashboard, MdPayments, MdBorderStyle } from "react-icons/md";
import { CiUser } from "react-icons/ci";
import { FaCookie } from "react-icons/fa";
import { IoIosContacts } from "react-icons/io";
import { TbReportSearch } from "react-icons/tb";
import { FiLogOut } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";

 export const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { to: "/", icon: <MdDashboard />, text: "Dashboard" },
    { to: "/user", icon: <CiUser />, text: "User" },
    { to: "/cook", icon: <FaCookie />, text: "Cook" },
    { to: "/payments", icon: <MdPayments />, text: "Payments" },
    { to: "/orders", icon: <MdBorderStyle />, text: "Orders" },
    { to: "/reports", icon: <TbReportSearch />, text: "Reports" },
    { to: "/contact", icon: <IoIosContacts />, text: "Contact" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("adminToken"); // Clear auth token
    window.location.href = "/admin/login"; // Redirect to login
  };

  return (
    <div className="w-64 h-screen bg-white shadow-xl border-r border-gray-200 flex flex-col">
      {/* Brand Header */}
      <div className="px-6 py-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800 tracking-tight">FoodBox</h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex-grow px-4 py-6 space-y-1">
        {menuItems.map(({ to, icon, text }) => (
          <SidebarLink 
            key={to} 
            to={to} 
            icon={icon} 
            text={text} 
            active={location.pathname.startsWith(to)} 
          />
        ))}
      </nav>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-red-100 hover:text-red-600 transition rounded-lg mx-4 mb-4"
      >
        <FiLogOut className="text-xl" />
        <span className="text-sm font-medium">Logout</span>
      </button>
    </div>
  );
};

const SidebarLink = ({ to, icon, text, active = false }) => {
  return (
    <Link
      to={to}
      className={`
        flex items-center gap-3 px-4 py-2.5 rounded-lg transition duration-200 ease-in-out 
        group relative overflow-hidden
        ${active 
          ? "bg-blue-600 text-white shadow-md" 
          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"}
      `}
    >
      <span className={`
        text-xl opacity-75 group-hover:opacity-100 transition
        ${active ? "text-white" : "text-gray-500"}
      `}>
        {icon}
      </span>
      <span className="text-sm font-medium">{text}</span>
      
      {active && (
        <span className="absolute right-2 h-1.5 w-1.5 bg-white rounded-full"></span>
      )}
    </Link>
  );
};

