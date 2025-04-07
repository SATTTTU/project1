import React from "react";

export const Table = ({ columns, data, renderRow }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            {columns?.map((column, index) => (
              <th
                key={index}
                className="px-6 py-3 text-center text-sm font-semibold text-gray-600 border border-gray-200"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.length > 0 ? (
            data.map((item, index) => renderRow(item, index))
          ) : (
            <tr>
              <td
                colSpan={columns?.length}
                className="px-6 py-4 text-center text-sm text-gray-500 border border-gray-200"
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
