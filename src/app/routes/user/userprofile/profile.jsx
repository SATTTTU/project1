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
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-white shadow-md">
        <Header />
      </div>

      <div className="flex-1 flex overflow-y-hidden bg-gray-50">
        <main className="container mx-auto px-4 py-6 flex-1 overflow-hidden">
          <div className="bg-white rounded-lg h-full ">
            <MobileMenuToggle
              isMobile={isMobile}
              activeTab={activeTab}
              showMobileMenu={showMobileMenu}
              setShowMobileMenu={setShowMobileMenu}
            />

            <div className="flex flex-col md:flex-row h-full overflow-hidden">
              <ProfileSidebar
                isMobile={isMobile}
                showMobileMenu={showMobileMenu}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                setShowMobileMenu={setShowMobileMenu}
                handleLogout={handleLogout}
              />

              {/* Scrollable content area only */}
              <div className="flex-1 p-4 overflow-y-auto">
                <Outlet />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProfileLayout;
