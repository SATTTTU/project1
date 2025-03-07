import React, { useState, useMemo } from "react";
import { Sidebar } from "../Homepage/aside/aside";
import { Pagination } from "../../../../components/ui/pagination/pagination";
import { Table } from "../../../../components/ui/tables/tables";  // Importing the Table component

const dummyUsers = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
  { id: 3, name: "Alice Johnson", email: "alice@example.com" },
  { id: 4, name: "Bob Brown", email: "bob@example.com" },
  { id: 5, name: "Charlie Adams", email: "charlie@example.com" },
  { id: 6, name: "David White", email: "david@example.com" },
  { id: 7, name: "Emma Green", email: "emma@example.com" },
  { id: 8, name: "Frank Black", email: "frank@example.com" },
  { id: 9, name: "Grace Blue", email: "grace@example.com" },
  { id: 10, name: "Hank Red", email: "hank@example.com" },
];

export const DisplayUser = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  // Memoized filtered users
  const filteredUsers = useMemo(
    () =>
      dummyUsers.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase())
      ),
    [search]
  );

  // Total Pages Calculation
  const totalPages = useMemo(
    () => Math.ceil(filteredUsers.length / usersPerPage),
    [filteredUsers.length]
  );

  const currentUsers = useMemo(() => {
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    return filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  }, [currentPage, filteredUsers]);

  // Define columns for the Table
  const columns = ["ID", "Name", "Email"];

  // Define the renderRow function for the Table
  const renderRow = (user) => (
    <tr key={user.id} className="text-center border odd:bg-gray-50 even:bg-white">
      <td className="border p-3">{user.id}</td>
      <td className="border p-3">{user.name}</td>
      <td className="border p-3">{user.email}</td>
    </tr>
  );

  return (
    <section className="flex h-screen">
      <Sidebar />
      <div className="p-6 w-full">
        <h1 className="text-3xl font-bold mb-6">User List</h1>
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-3 border rounded-lg w-full mb-6 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="bg-white p-6 shadow-md rounded-lg">
          <Table
            columns={columns}
            data={currentUsers}
            renderRow={renderRow}
          />
          {/* Pagination Component */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </div>
    </section>
  );
};
