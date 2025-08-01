// modules/admin/dashboard/components/statscard.js
import React from "react";
import { motion } from "framer-motion";

export const StatsCard = ({ icon, value, title, increase, timeFrame, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay * 0.1 }}
      className="bg-white rounded-xl shadow-sm p-4 md:p-6 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="bg-gray-50 p-2 md:p-3 rounded-lg">{icon}</div>
        <span className="text-green-500 text-xs md:text-sm font-medium">{increase}</span>
      </div>
      <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">{value}</h3>
      <p className="text-lg md:text-xl text-gray-500">{title}</p>
      <span className="text-sm text-gray-400">{timeFrame}</span>
    </motion.div>
  );
};