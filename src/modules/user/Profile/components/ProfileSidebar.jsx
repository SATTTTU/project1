import { Link } from "react-router-dom";
import { FiUser, FiShoppingBag, FiHeart, FiSettings, FiLogOut } from "react-icons/fi";

export const ProfileSidebar = ({ 
  isMobile, 
  showMobileMenu, 
  activeTab, 
  setActiveTab, 
  setShowMobileMenu, 
  handleLogout 
}) => {
  const navItems = [
    { id: "profile", label: "Your Profile", icon: <FiUser />, path: "/user/profile" },
    { id: "orders", label: "Your Orders", icon: <FiShoppingBag />, path: "/user/orders" },
    { id: "wishlist", label: "Wishlist", icon: <FiHeart />, path: "/user/wishlist" },
    { id: "settings", label: "Settings", icon: <FiSettings />, path: "/user/settings" },
  ];

  return (
    <div className={`md:w-64 bg-white border-r ${isMobile ? (showMobileMenu ? "block" : "hidden") : "block"}`}>
      <div className="p-6 border-b">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
            <FiUser className="text-gray-500 text-xl" />
          </div>
          <div className="ml-3">
            <h3 className="font-medium">Your Profile</h3>
            <p className="text-sm text-gray-500">john.doe@example.com</p>
          </div>
        </div>
      </div>

      <nav className="p-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.id}>
              <Link
                to={item.path}
                className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                  activeTab === item.id ? "bg-green-50 text-green-600" : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => {
                  setActiveTab(item.id);
                  if (isMobile) setShowMobileMenu(false);
                }}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 rounded-lg text-red-600 hover:bg-gray-100 transition-colors"
            >
              <FiLogOut className="mr-3" />
              Sign out
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};
