import { FaHome, FaShoppingBag, FaHeart, FaCommentAlt, FaHistory, FaFileAlt, FaCog } from "react-icons/fa"
import { Link } from "react-router-dom"

export const Sidebar=()=> {
  return (
		<div className="w-64 bg-white border-r flex flex-col">
			{/* Logo */}
			<div className="p-6">
				<h1 className="text-2xl font-bold">
					KhajaBox<span className="text-green-500">.</span>
				</h1>
			</div>

			{/* Navigation */}
			<nav className="flex-1 px-4">
				<div className="space-y-2">
					<NavItem icon={<FaHome size={18} />} label="Dashboard" active />
					<NavItem icon={<FaShoppingBag size={18} />} label="Food Order" />
					<NavItem icon={<FaHeart size={18} />} label="Favorite" />
					<NavItem icon={<FaCommentAlt size={18} />} label="Message" />
					<NavItem icon={<FaHistory size={18} />} label="Order History" />
					<NavItem icon={<FaFileAlt size={18} />} label="Bills" />
					<NavItem icon={<FaCog size={18} />} label="Setting" />
				</div>
			</nav>

			{/* Upgrade Account */}
			{/* <div className="p-4 m-4 bg-green-500 rounded-xl text-white">
				<h3 className="font-semibold">
					Upgrade your Account to Get Free Voucher
				</h3>
				<button className="mt-4 bg-white text-green-500 px-4 py-2 rounded-lg text-sm font-medium">
					Upgrade
				</button>
			</div> */}
		</div>
	);
}

function NavItem({ icon, label, active }) {
  return (
    <Link
      href="#"
      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
        active ? "bg-green-500 text-white" : "text-gray-600 hover:bg-yellow-50"
      }`}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </Link>
  )
}

