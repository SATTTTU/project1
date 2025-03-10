import { Search, X } from "react-feather";

export const SidebarHeader = ({ searchQuery, setSearchQuery, toggleSidebar, totalNewMessages }) => (
    <div className="p-4 border-b border-gray-200 bg-white sticky top-0 z-10">
      <div className="flex items-center mb-4">
        <h1 className="text-xl font-semibold text-gray-800">Messages</h1>
        <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
          {totalNewMessages} new
        </span>
        <button
          className="ml-auto p-1 rounded-full hover:bg-gray-100 text-gray-500 md:hidden"
          onClick={toggleSidebar}
        >
          <X size={18} />
        </button>
      </div>
      <div className="relative">
        <input
          type="text"
          placeholder="Search messages..."
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
      </div>
    </div>
  );