import React, { useMemo } from "react";
import { Table } from "@/components/ui/tables/tables";
import Pagination from "@/components/ui/pagination/pagination";
import { useUserList } from "../api/get-users";

export const UserList = ({ search = "", currentPage = 1, rowsPerPage = 5, onPageChange }) => {
  // Fetch users from the API
  const { data: users, isLoading, error } = useUserList();

  // Filter users based on search
  const filteredUsers = useMemo(() => {
    if (!users) return [];
    return users.filter(user =>
      user?.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [users, search]);

  // Calculate total pages
  const totalPages = useMemo(() => 
    Math.ceil((filteredUsers?.length || 0) / rowsPerPage),
    [filteredUsers, rowsPerPage]
  );

  // Get current page data
  const currentUsers = useMemo(() => {
    if (!filteredUsers.length) return [];
    const startIndex = (currentPage - 1) * rowsPerPage;
    return filteredUsers.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredUsers, currentPage, rowsPerPage]);

  // Table columns
  const columns = ["ID", "Name", "Email"];

  // Render row function
  const renderRow = (user) => (
    <tr
      key={user.id}
      className="text-center border border-gray-300 odd:bg-white even:bg-gray-50 text-base text-gray-800"
    >
      <td className="p-3">{user.id}</td>
      <td className="p-3">{user.name}</td>
      <td className="p-3">{user.email}</td>
    </tr>
  );

  // Loading and error states
  if (isLoading) return <p>Loading users...</p>;
  if (error) return <p>Error loading users: {error.message}</p>;
  if (!users || users.length === 0) return <p>No users found.</p>;

  return (
    <>
      <Table
        columns={columns}
        data={currentUsers}
        renderRow={renderRow}
      />
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </>
  );
};