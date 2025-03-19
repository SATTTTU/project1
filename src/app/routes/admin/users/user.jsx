// DisplayUserRoute.jsx
import React, { useState } from "react";
import { Sidebar } from "@/components/ui/admin/aside/aside";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { UserList } from "@/modules/admin/users/components/users";
export const DisplayUserRoute = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  return (
    <section className="flex h-screen font-sans bg-gray-100">
      <Sidebar />
      <div className="p-6 w-full">
        <Link
          to="/admin/dashboard"
          className="mr-2 p-1 rounded-full hover:bg-gray-100 text-gray-500 cursor-pointer"
        >
          <FaArrowLeft size={20} />
        </Link>
        <h1 className="text-3xl font-bold mb-6 text-gray-900">User List</h1>
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={handleSearchChange}
          className="p-3 border rounded-lg w-full mb-6 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="bg-white p-6 shadow-md rounded-lg">
          <UserList 
            search={search}
            currentPage={currentPage}
            rowsPerPage={rowsPerPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </section>
  );
};