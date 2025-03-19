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

  // Determine the status based on approval_status
  let status = "unknown";
  
  // Normalize the status value to handle inconsistencies
  const rawStatus = (approval_status || "").toLowerCase();
  
  // Map the raw status to match the CookProfileDetails component mapping
  if (["approved", "online", "verified", "active"].includes(rawStatus)) {
    status = "verified";
  } else if (["under-review", "pending", "in review"].includes(rawStatus)) {
    status = "pending";
  } else if (["rejected", "declined", "inactive"].includes(rawStatus)) {
    status = "rejected";
  }

  // Status display configuration
  const statusConfig = {
    verified: { text: "Verified", class: "bg-green-100 text-green-800" },
    pending: { text: "Pending", class: "bg-yellow-100 text-yellow-800" },
    rejected: { text: "Rejected", class: "bg-red-100 text-red-800" },
    unknown: { text: "Unknown", class: "bg-gray-100 text-gray-800" }
  };

  const { text, class: statusClass } = statusConfig[status];

  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">{name || "Unknown"}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusClass}`}>
          {text}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <RatingStars rating={average_rating || 0} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">{total_reviews || 0}</td>
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