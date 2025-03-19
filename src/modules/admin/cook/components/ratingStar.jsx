import React from "react";

const RatingStars = ({ rating }) => {
  if (rating === null || rating === undefined) return "No ratings";
  
  // Assuming rating is on a scale of 0-5
  const totalStars = 5;
  const filledStars = Math.round(rating); // If rating is already 0-5
  // If rating is on a different scale (e.g. 0-100), use:
  // const filledStars = Math.round(rating / 20);
  const emptyStars = totalStars - filledStars;
  
  return (
    <div className="flex justify-center">
      {[...Array(filledStars)].map((_, i) => (
        <span key={`filled-${i}`} className="text-yellow-500">★</span>
      ))}
      {[...Array(emptyStars)].map((_, i) => (
        <span key={`empty-${i}`} className="text-gray-300">☆</span>
      ))}
    </div>
  );
};

export default RatingStars;