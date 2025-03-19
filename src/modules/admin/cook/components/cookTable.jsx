import React from "react";
import CookRow from "./CookRow";

const CookTable = ({ cooks, navigate, isLoading }) => {
  console.log("CookTable props - cooks:", cooks); // For debugging

  if (isLoading) {
    return <div className="text-center py-4">Loading...</div>;
  }
  
  // Enhanced empty check
  if (!cooks || !Array.isArray(cooks) || cooks.length === 0) {
    return <div className="text-center py-4">No cooks found matching your criteria.</div>;
  }
  
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-fixed border-collapse">
        <thead>
          <tr className="bg-gray-200">
            {["Name", "Status", "Rating", "Reviews", "Actions"].map((header) => (
              <th key={header} className="p-3 font-semibold text-gray-700 text-center align-middle">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {cooks.map((cook) => (
            <CookRow key={cook.id} cook={cook} navigate={navigate} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CookTable;