import React from "react";

const RatingStars = ({ rating }) => {
  if (rating === null || rating === undefined || rating === "0.00") {
    return <div className="text-center text-gray-500">No ratings</div>;
  }
    
  // Parse the rating to a number if it's a string
  const numRating = parseFloat(rating);
  
  // Assuming rating is on a scale of 0-5
  const totalStars = 5;
  const filledStars = Math.round(numRating);
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