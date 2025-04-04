export const CookTabs = ({ activeTab, setActiveTab, reviewCount }) => {
    return (
      <div className="mb-6 border-b border-slate-400">
        <div className="flex overflow-x-auto">
          <button
            onClick={() => setActiveTab("categories")}
            className={`px-4 py-2 font-medium text-sm whitespace-nowrap cursor-pointer${
              activeTab === "categories"
                ? "text-green-600 border-b-2 border-green-600"
                : "text-gray-600 hover:text-green-600"
            }`}
          >
            Categories
          </button>
  
          <button
            onClick={() => setActiveTab("reviews")}
            className={`px-4 py-2 font-medium text-sm whitespace-nowrap cursor-pointer${
              activeTab === "reviews"
                ? "text-green-600 border-b-2 border-green-600"
                : "text-gray-600 hover:text-green-600"
            }`}
          >
            Reviews 
          </button>
  
          <button
            onClick={() => setActiveTab("about")}
            className={`px-4 py-2 font-medium text-sm whitespace-nowrap cursor-pointer ${
              activeTab === "about"
                ? "text-green-600 border-b-2 border-green-600"
                : "text-gray-600 hover:text-green-600"
            }`}
          >
            About
          </button>
        </div>
      </div>
    )
  }