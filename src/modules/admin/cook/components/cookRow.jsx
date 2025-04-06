import React from "react";
import RatingStars from "./ratingStar";

const CookRow = ({ cook, navigate }) => {
  // Use optional chaining to avoid errors if properties don't exist
  const {
    id,
    name,
    approval_status,
    average_rating,
    total_reviews,
  } = cook || {};

  // Determine status display text and class based on approval_status only
  let statusText = "Unknown";
  let statusClass = "bg-gray-100 text-gray-800";

  // Handle approval status
  if (approval_status === "approved") {
    statusText = "Approved";
    statusClass = "bg-green-100 text-green-800";
  } else if (approval_status === "under-review") {
    statusText = "Under Review";
    statusClass = "bg-yellow-100 text-yellow-800";
  } else if (approval_status === "rejected") {
    statusText = "Rejected";
    statusClass = "bg-red-100 text-red-800";
  }

  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">{name || "Unknown"}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusClass}`}>
          {statusText}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <RatingStars rating={parseFloat(average_rating) || 0} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-center">{total_reviews || 0}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          onClick={() => navigate(`/admin/cookDetails/${id}`)}
          className="text-blue-500 hover:underline cursor-pointer"
        >
          Profile
        </span>
      </td>
    </tr>
  );
};

export default CookRow;