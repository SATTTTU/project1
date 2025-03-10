import React, { useState } from "react";
import { MdDashboard, MdPayments, MdBorderStyle } from "react-icons/md";
import { CiUser } from "react-icons/ci";
import { FaCookie } from "react-icons/fa";
import { IoIosContacts } from "react-icons/io";
import { TbReportSearch } from "react-icons/tb";
import { FiLogOut, FiMenu } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";

export const Sidebar = () => {
  const location = useLocation();
  const [showSidebar, setShowSidebar] = useState(false);

  const menuItems = [
    { to: "/admin/dashboard", icon: <MdDashboard />, text: "Dashboard" },
    { to: "/admin/userDetails", icon: <CiUser />, text: "User" },
    { to: "/admin/cookDetails", icon: <FaCookie />, text: "Cook" },
    { to: "/admin/paymentpage", icon: <MdPayments />, text: "Payments" },
    { to: "/admin/reports", icon: <TbReportSearch />, text: "Reports" },
    { to: "/contact", icon: <IoIosContacts />, text: "Contact" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/admin/login";
  };

  const handleToggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={handleToggleSidebar}
        className="md:hidden fixed top-4 left-4 bg-blue-600 text-white p-2 rounded-lg shadow-lg z-50"
      >
        <FiMenu className="text-2xl" />
      </button>

      {/* Sidebar Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          showSidebar
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }`}
        onClick={handleToggleSidebar}
      ></div>

      {/* Sidebar Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-50 transition-transform duration-300 transform ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative md:flex flex-col border-r border-gray-200`}
      >
        <div className="px-6 py-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
            KhanaBox
          </h1>
        </div>

        <nav className="flex-grow px-4 py-6 space-y-1">
          {menuItems.map(({ to, icon, text }) => (
            <SidebarLink
              key={to}
              to={to}
              icon={icon}
              text={text}
              active={location.pathname.startsWith(to)}
              onClick={handleToggleSidebar} // Close sidebar on click (mobile only)
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
    </>
  );
};

const SidebarLink = ({ to, icon, text, active = false, onClick }) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`
        flex items-center gap-3 px-4 py-2.5 rounded-lg transition duration-200 ease-in-out 
        group relative overflow-hidden
        ${
          active
            ? "bg-blue-600 text-white shadow-md"
            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        }
      `}
    >
      <span
        className={`
        text-xl opacity-75 group-hover:opacity-100 transition
        ${active ? "text-white" : "text-gray-500"}
      `}
      >
        {icon}
      </span>
      <span className="text-sm font-medium">{text}</span>

      {active && (
        <span className="absolute right-2 h-1.5 w-1.5 bg-white rounded-full"></span>
      )}
    </Link>
  );
};
