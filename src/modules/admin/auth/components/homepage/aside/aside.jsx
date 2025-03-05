import { MdDashboard, MdPayments } from "react-icons/md";
import { CiUser } from "react-icons/ci";
import { FaCookie } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { MdBorderStyle } from "react-icons/md";
import { IoIosContacts } from "react-icons/io";
import { TbReportSearch } from "react-icons/tb";
import {Link } from "react-router-dom"

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-white shadow-lg p-5 flex flex-col border-r">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">FoodBox</h1>

      <nav className="space-y-2">
        <Link  icon={<MdDashboard />} text="Dashboard" active />
        <Link to="/user"  icon={<CiUser />} text="User" />
        <Link icon={<FaCookie />} text="Cook" />
        <Link icon={<MdPayments />} text="Payments" />
        <Link icon={<MdBorderStyle />} text="Orders" />
        <Link icon={<TbReportSearch />} text="Reports" />
        <Link icon={<IoIosContacts />} text="Contact" />
      </nav>

      <div className="mt-auto">
        <Link icon={<FiLogOut />} text="Log Out" logout />
      </div>
    </div>
  );
};

const Link = ({ icon, text, active, logout }) => {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition font-medium 
        ${active ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"} 
        ${logout ? "text-red-600 hover:bg-red-100" : ""}`}
    >
      <span className="text-lg">{icon}</span>
      <span>{text}</span>
    </div>
  );
};

export default Sidebar;