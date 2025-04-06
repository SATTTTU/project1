import React from "react";
import CookRow from "./cookRow";

const CookTable = ({ cooks, navigate, isLoading }) => {
  if (isLoading) {
    return <div className="text-center py-4">Loading...</div>;
  }
    
  // Enhanced empty check
  if (!cooks || !Array.isArray(cooks) || cooks.length === 0) {
    return <div className="text-center py-4">No cooks found matching your criteria.</div>;
  }
    
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-3 font-semibold text-gray-700 text-left">Name</th>
            <th className="p-3 font-semibold text-gray-700 text-center">Status</th>
            <th className="p-3 font-semibold text-gray-700 text-center">Rating</th>
            <th className="p-3 font-semibold text-gray-700 text-center">Reviews</th>
            <th className="p-3 font-semibold text-gray-700 text-center">Actions</th>
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