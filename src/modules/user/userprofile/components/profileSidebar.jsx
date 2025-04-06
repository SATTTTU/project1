import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const ProfileSidebar = ({ activeTab, setActiveTab, handleLogout }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false); // State for modal visibility

  const menuItems = [
    { name: "Profile", path: "/profile" },
    { name: "Order", path: "/profile/order" },
    // { name: "Wishlist", path: "/profile/wishlist" },
    { name: "Settings", path: "/profile/settings" },
  ];

  // Function to handle logout action
  const confirmLogout = () => {
    handleLogout();
    setShowModal(false); // Close the modal after logout
  };

  return (
		<div className="w-full md:w-1/4 bg-gray-100 p-2 lg:h-screen">
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
							{item?.name}
						</button>
					</li>
				))}
			</ul>

			<button
				onClick={() => setShowModal(true)} // Show the modal when clicked
				className="w-full mt-6 text-left p-2 rounded-md"
			>
				Logout
			</button>

			{/* Full-page Modal */}
			{showModal && (
				<div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
					<div className="bg-white p-8 rounded-md w-full h-full flex flex-col justify-center items-center">
						<h2 className="text-xl font-semibold mb-4">
							Are you sure you want to log out?
						</h2>
						<div className="space-x-4">
							<button
								onClick={() => setShowModal(false)} // Close the modal if user cancels
								className="px-6 py-3 bg-gray-300 text-black rounded-md"
							>
								Cancel
							</button>
							<button
								onClick={confirmLogout}
								className="px-6 py-3 bg-red-600 text-white rounded-md"
							>
								Logout
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
