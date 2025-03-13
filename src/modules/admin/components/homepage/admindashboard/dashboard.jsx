import React, { useState, useRef, useEffect } from "react";
import { IoIosNotifications, IoMdSearch } from "react-icons/io";
import {
  FaChartPie,
  FaUsers,
  FaCog,
  FaUtensils,
  FaMoneyBillWave,
  FaClipboardList,
} from "react-icons/fa";
import {  AnimatePresence } from "framer-motion";
import { ProfileCard } from "./profile/adminInformation";

import { Sidebar } from "../aside/aside";
import { Link } from "react-router-dom";

export const AdminDashboard = () => {
  const [showProfile, setShowProfile] = useState(false);
  const profileRef = useRef(null);

  const dashboardStats = [
    {
      icon: <FaUsers className="text-blue-500 text-2xl" />,
      title: "Total Users",
      value: "1,254",
      increase: "+12.5%",
      timeFrame: "this month",
    },
    {
      icon: <FaUtensils className="text-green-500 text-2xl" />,
      title: "Active Cooks",
      value: "328",
      increase: "+8.2%",
      timeFrame: "this month",
    },
    {
      icon: <FaMoneyBillWave className="text-purple-500 text-2xl" />,
      title: "Total Revenue",
      value: "₹45,230",
      increase: "+15.3%",
      timeFrame: "this month",
    },
    {
      icon: <FaClipboardList className="text-orange-500 text-2xl" />,
      title: "Total Orders",
      value: "856",
      increase: "+10.7%",
      timeFrame: "today",
    },
  ];



  const topCooks = [
    { name: "Meera's Kitchen", rating: 4.8, orders: 156, earnings: "₹25,400" },
    { name: "Spice Garden", rating: 4.7, orders: 142, earnings: "₹22,800" },
    { name: "Home Flavours", rating: 4.6, orders: 128, earnings: "₹20,500" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    };

    if (showProfile) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showProfile]);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm p-4 flex items-center justify-between">
          <div className="flex-1 max-w-md relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
            <IoMdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
          </div>

          <div className="flex items-center gap-6 ml-4">
            <Link to="/admin/reports" className="relative">
              <IoIosNotifications className="text-2xl text-gray-600 hover:text-blue-500 transition-colors" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </Link>

            <div
              className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg"
              onClick={() => setShowProfile(!showProfile)}
            >
              <img
                src="https://via.placeholder.com/40"
                alt="Admin"
                className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
              />
              <span className="text-gray-700 font-medium hidden sm:block">
                Admin
              </span>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {dashboardStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-gray-50 p-3 rounded-lg">{stat.icon}</div>
                  <span className="text-green-500 text-sm font-medium">
                    {stat.increase}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </h3>
                <p className="text-gray-500 text-sm">{stat.title}</p>
                <span className="text-xs text-gray-400">{stat.timeFrame}</span>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
          

            {/* Top Performing Cooks */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Top Performing Cooks
                </h2>
                <Link
                  to="/admin/cooks"
                  className="text-blue-500 text-sm hover:underline"
                >
                  View All
                </Link>
              </div>
              <div className="space-y-4">
                {topCooks.map((cook, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <span className="text-sm font-medium text-gray-900">
                        {cook.name}
                      </span>
                      <div className="flex items-center mt-1">
                        <span className="text-sm text-yellow-500">★</span>
                        <span className="text-sm text-gray-500 ml-1">
                          {cook.rating}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium text-gray-900">
                        {cook.earnings}
                      </span>
                      <p className="text-sm text-gray-500">
                        {cook.orders} orders
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      <AnimatePresence>
        {showProfile && (
          <motion.div
            ref={profileRef}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 right-4 z-50"
          >
            <div className="bg-white shadow-xl rounded-xl w-80">
              <ProfileCard />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
