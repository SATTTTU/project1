import { Header } from "@/modules/user/Profile/components/Header";
import MobileMenuToggle from "@/modules/user/Profile/components/MenuToggle";
import { OrdersContent } from "@/modules/user/Profile/components/OrdersContent";
import { ProfileContent } from "@/modules/user/Profile/components/ProfileContent";
// import { ProfileContent } from "@/modules/user/Profile/components/ProfileContent";
import { ProfileSidebar } from "@/modules/user/Profile/components/ProfileSidebar";
import WishlistContent from "@/modules/user/Profile/components/WishlistContent";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";


export const ProfilePage = () => {
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
    if (path === "/user/profile" || path === "") {
      setActiveTab("profile");
    } else if (path === "/user/orders") {
      setActiveTab("orders");
    } else if (path === "wishlist") {
      setActiveTab("wishlist");
    } else if (path === "settings") {
      setActiveTab("settings");
    }
  }, [location]);

  const handleLogout = () => {
    navigate("/");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "/user/profile":
        return <ProfileContent/>;
      case "/user/orders":
        return <OrdersContent />;
      case "wishlist":
        return <WishlistContent />;
      case "settings":
        return <SettingsContent />;
      default:
        return <ProfileContent/>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header/>

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

            <div className="flex-1 p-6">{renderContent()}</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;