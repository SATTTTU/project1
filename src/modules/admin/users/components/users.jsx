import React from 'react';

export const User = ({ user }) => {
  return (
    <tr
      key={user.id}
      className="text-center border border-gray-300 odd:bg-white even:bg-gray-50 text-base text-gray-800"
    >
      <td className="p-3">{user.id}</td>
      <td className="p-3">{user.name}</td>
      <td className="p-3">{user.email}</td>
    </tr>
  );
};
