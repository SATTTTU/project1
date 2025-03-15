import { useNavigate } from "react-router-dom";

export const ProfileSidebar = ({ activeTab, setActiveTab, handleLogout }) => {
  const navigate = useNavigate();

  const menuItems = [
    { name: "Profile", path: "/profile" },
    { name: "Orders", path: "/profile/order" },
    { name: "Wishlist", path: "/profile/wishlist" },
    { name: "Settings", path: "/profile/settings" },
  ];

  return (
    <div className="w-full md:w-1/4 bg-gray-100 p-4">
      <ul className="space-y-4">
        {menuItems.map((item) => (
          <li key={item.path}>
            <button
              className={`w-full text-left p-2 rounded-md ${
                activeTab === item.path.split("/").pop()
                  ? "bg-[#426B1F] text-white"
                  : "text-gray-700"
              }`}
              onClick={() => {
                setActiveTab(item.path.split("/").pop());
                navigate(item.path);
              }}
            >
              {item.name}
            </button>
          </li>
        ))}
      </ul>

      <button
        onClick={handleLogout}
        className="w-full mt-6 text-left p-2  text-white rounded-md"
      >
        Logout
      </button>
    </div>
  );
};
