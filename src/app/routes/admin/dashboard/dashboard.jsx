// pages/AdminDashboardRoute.js
import React, { useState, useRef, useEffect } from "react";
import { IoIosNotifications, IoMdSearch } from "react-icons/io";
import { FaUsers, FaUtensils, FaMoneyBillWave, FaClipboardList } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { Sidebar } from "@/components/ui/admin/aside/aside";
import { ProfileCard } from "@/modules/components/homepage/admindashboard/profile/adminInformation";
import { StatsCard } from "@/modules/admin/dashboard/components/statscard";
import { TopCooksList } from "@/modules/admin/dashboard/components/top-cooks";
import { ProfileAvatar } from "@/modules/admin/dashboard/components/avatar";


export const AdminDashboardRoute = () => {
  const [showProfile, setShowProfile] = useState(false);
  const profileRef = useRef(null);

  const dashboardStats = [
    { icon: <FaUsers className="text-blue-500 text-2xl" />, title: "Total Users", value: "1,254", increase: "+12.5%", timeFrame: "this month" },
    { icon: <FaUtensils className="text-green-500 text-2xl" />, title: "Active Cooks", value: "328", increase: "+8.2%", timeFrame: "this month" },
    { icon: <FaMoneyBillWave className="text-purple-500 text-2xl" />, title: "Total Revenue", value: "₹45,230", increase: "+15.3%", timeFrame: "this month" },
    { icon: <FaClipboardList className="text-orange-500 text-2xl" />, title: "Total Orders", value: "856", increase: "+10.7%", timeFrame: "today" },
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
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <IoMdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
          </div>

          <div className="flex items-center gap-6 ml-4">
            <IoIosNotifications className="text-2xl text-gray-600 hover:text-blue-500 transition" />
            <ProfileAvatar onClick={() => setShowProfile(!showProfile)} />
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {dashboardStats.map((stat, index) => (
              <StatsCard key={index} {...stat} delay={index} />
            ))}
          </div>

          <TopCooksList cooks={topCooks} />
        </main>

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
    </div>
  );
};
