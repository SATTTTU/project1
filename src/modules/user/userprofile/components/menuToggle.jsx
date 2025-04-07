const MobileMenuToggle = ({ isMobile, activeTab, showMobileMenu, setShowMobileMenu }) => {
    const navItems = [
      { id: "profile", label: "Your Profile" },
      { id: "orders", label: "Your Orde" },
      { id: "settings", label: "Settings" },
    ];
  
    if (!isMobile) return null;
  
    return (
      <div className="p-4 border-b">
        <button
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="flex items-center justify-between w-full"
        >
          <span className="font-medium">
            {navItems.find((item) => item.id === activeTab)?.label || "Your Profile"}
          </span>
          <svg
            className={`w-5 h-5 transition-transform ${showMobileMenu ? "transform rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    );
  };
  
  export default MobileMenuToggle;