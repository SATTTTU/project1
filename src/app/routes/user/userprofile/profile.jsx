import { Header } from "@/modules/user/dashboard/components/header";
import { MobileMenuToggle } from "@/modules/user/userprofile/components/menuToggle";
import { ProfileSidebar } from "@/modules/user/userprofile/components/profileSidebar";
import { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

const ProfileLayout = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [activeTab, setActiveTab] = useState("profile");
	const [isMobile, setIsMobile] = useState(false);
	const [showMobileMenu, setShowMobileMenu] = useState(false);

	useEffect(() => {
		const checkIfMobile = () => {
			setIsMobile(window.innerWidth < 768);
		};

		checkIfMobile();
		window.addEventListener("resize", checkIfMobile);
		return () => {
			window.removeEventListener("resize", checkIfMobile);
		};
	}, []);

	useEffect(() => {
		const path = location.pathname.split("/").pop();
		setActiveTab(path || "profile");
	}, [location]);

	const handleLogout = () => {
		localStorage.clear();
		navigate("/");
	};

	return (
		<div className="min-h-screen bg-gray-50">
			<Header />
			<main className="container mx-auto px-4 py-6">
				<div className="bg-white rounded-lg shadow-md overflow-hidden">
					<MobileMenuToggle
						isMobile={isMobile}
						activeTab={activeTab}
						showMobileMenu={showMobileMenu}
						setShowMobileMenu={setShowMobileMenu}
					/>

					<div className="flex flex-col md:flex-row">
						<ProfileSidebar
							isMobile={isMobile}
							showMobileMenu={showMobileMenu}
							activeTab={activeTab}
							setActiveTab={setActiveTab}
							setShowMobileMenu={setShowMobileMenu}
							handleLogout={handleLogout}
						/>

						<div className="flex-1 p-6">
							<Outlet />
						</div>
					</div>
				</div>
			</main>
		</div>
	);
};

export default ProfileLayout;
