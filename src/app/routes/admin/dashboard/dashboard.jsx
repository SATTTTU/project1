import React, { useState, useRef, useCallback } from "react";
import { IoIosNotifications, IoMdSearch } from "react-icons/io";
import { FaUsers, FaUtensils, FaMoneyBillWave, FaClipboardList } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { Sidebar } from "@/components/ui/admin/aside/aside";
import { StatsCard } from "@/modules/admin/dashboard/components/statscard";
import { TopCooksList } from "@/modules/admin/dashboard/components/top-cooks";
import { ProfileAvatar } from "@/modules/admin/dashboard/components/avatar";
import { Link } from "react-router-dom";
import { ProfileCard } from "@/modules/admin/editProfile/components/profilecard";
import { useGetTotalEarning } from "@/modules/admin/payment/api/gettotalearning";

// Custom hook to detect clicks outside a specified element
const useOutsideClick = (ref, callback) => {
  const handleClick = useCallback(
    (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    },
    [ref, callback]
  );

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [handleClick]);
};

export const AdminDashboardRoute = React.memo(() => {
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const profileRef = useRef(null);
  const notificationRef = useRef(null);
  
  // Fetch total earnings data
  const { data: earningsData, isLoading: earningsLoading, error: earningsError } = useGetTotalEarning();

  const dashboardStats = React.useMemo(() => {
    const formattedEarnings = earningsLoading || earningsError 
  ? "Loading..." 
  : `₹${earningsData?.totalEarnings?.toLocaleString() || "0"}`;

const earningIncrease = earningsLoading || earningsError
  ? "..." 
  : `+${earningsData?.percentageIncrease || "0"}%`;
      
    return [
      { icon: <FaUsers className="text-blue-500 text-2xl" />, title: "Total Users", value: "1,254", increase: "+12.5%", timeFrame: "this month" },
      { icon: <FaUtensils className="text-green-500 text-2xl" />, title: "Active Cooks", value: "328", increase: "+8.2%", timeFrame: "this month" },
      { icon: <FaMoneyBillWave className="text-purple-500 text-2xl" />, title: "Total Revenue", value: formattedEarnings, increase: earningIncrease, timeFrame: "this month" },
      { icon: <FaClipboardList className="text-orange-500 text-2xl" />, title: "Total Orders", value: "856", increase: "+10.7%", timeFrame: "today" },
    ];
  }, [earningsData, earningsLoading, earningsError]);

  const topCooks = React.useMemo(() => [
    { name: "Meera's Kitchen", rating: 4.8, orders: 156, earnings: "₹25,400" },
    { name: "Spice Garden", rating: 4.7, orders: 142, earnings: "₹22,800" },
    { name: "Home Flavours", rating: 4.6, orders: 128, earnings: "₹20,500" },
  ], []);

  const notifications = [
    { id: 1, message: "New order placed by customer #1023" },
    { id: 2, message: "Cook #45 has updated the menu" },
    { id: 3, message: "Driver #12 reported a delivery issue" },
  ];

  const toggleProfile = useCallback(() => {
    setShowProfile((prev) => !prev);
  }, []);

  const toggleNotifications = useCallback(() => {
    setShowNotifications((prev) => !prev);
  }, []);

  useOutsideClick(profileRef, () => setShowProfile(false));
  useOutsideClick(notificationRef, () => setShowNotifications(false));

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm p-4 flex items-center justify-between relative">
          <div className="flex-1 max-w-lg relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-[1/2] pl-8 pr-4 ml-10 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-6 ml-4">
            <div className="relative">
              <Link onClick={toggleNotifications} className="relative">
                <IoIosNotifications className="text-2xl text-gray-600 hover:text-green-500 transition" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {notifications.length}
                </span>
              </Link>

              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    ref={notificationRef}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-4 z-50"
                  >
                    <h2 className="text-lg font-semibold mb-2">Notifications</h2>
                    {notifications.map((notification) => (
                      <div key={notification.id} className="p-2 hover:bg-gray-100 rounded-md cursor-pointer">
                        {notification.message}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <div className="relative">
              <ProfileAvatar onClick={toggleProfile} />
              
              <AnimatePresence>
                {showProfile && (
                  <motion.div
                    ref={profileRef}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg p-4 z-50"
                  >
                    <ProfileCard />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
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
      </div>
    </div>
  );
});