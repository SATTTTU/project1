import { Sidebar } from "../sideBar/sidebar";
import { Bell, Menu, User } from "lucide-react";
import React, { useState } from "react";

const CookNavBAr = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div>
      <header className="flex h-16 items-center justify-between border-b px-4 md:px-6 bg-white">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden rounded-md p-2 hover:bg-gray-100 "
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle sidebar</span>
            <Sidebar sidebarOpen={sidebarOpen} />
          </button>

          <h1 className="text-xl font-bold text-[#426B1F]">KhanaBox</h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="relative rounded-full p-2 hover:bg-gray-100">
            <Bell className="h-6 w-6" />
            <span className="absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs text-white">
              3
            </span>
            <span className="sr-only">Notifications</span>
          </button>
          <button className="rounded-full p-2 hover:bg-gray-100">
            <User className="h-6 w-6" />
            <span className="sr-only">User profile</span>
          </button>
        </div>
      </header>
    </div>
  );
};

export default CookNavBAr;
