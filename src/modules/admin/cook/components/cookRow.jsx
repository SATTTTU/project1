import React from "react";
import RatingStars from "./ratingStar";

const CookRow = ({ cook, navigate }) => {
  console.log("Individual cook data:", cook); // For debugging
  
  // Use optional chaining to avoid errors if properties don't exist
  const { 
    id, 
    name, 
    // Use available_status as shown in your API data example
    available_status, 
    approval_status, // Keep this as a fallback
    average_rating, 
    total_reviews 
  } = cook || {};
  
  // Determine the status to display
  const statusValue = available_status || approval_status || "unknown";
  
  return (
    <tr className="border-b hover:bg-gray-100">
      <td className="p-3 text-left align-middle">{name || "Unknown"}</td>
      <td className="p-3 text-center align-middle">
        <span
          className={`inline-block px-2 py-1 rounded-full text-xs whitespace-nowrap ${
            statusValue === "online" || statusValue === "verified"
              ? "bg-green-100 text-green-800"
              : statusValue === "offline" || statusValue === "under-review"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {statusValue === "offline" ? "Pending" : 
           statusValue === "under-review" ? "Pending" : 
           statusValue === "online" ? "Verified" : 
           statusValue === "verified" ? "Verified" : 
           statusValue}
        </span>
      </td>
      <td className="p-3 text-center align-middle">
        <RatingStars rating={average_rating} />
      </td>
      <td className="p-3 text-center align-middle">{total_reviews || 0}</td>
      <td className="p-3 text-center align-middle">
        <button
          onClick={() => navigate(`/admin/cookDetails/${id}`)}
          className="text-blue-500 hover:underline cursor-pointer"
        >
          Profile
        </button>
      </td>
    </tr>
  );
};

export default CookRow;