import React from "react";

export const User = ({ user }) => {
  return (
    <tr
      key={user.id}
      className="text-center border odd:bg-gray-50 even:bg-white"
    >
      <td className="border p-3">{user.id}</td>
      <td className="border p-3">{user.name}</td>
      <td className="border p-3">{user.email}</td>
    </tr>
  );
};
