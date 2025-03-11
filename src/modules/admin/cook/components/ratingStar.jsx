 const RatingStars = ({ rating }) => {
    
    if (rating === null) return "No ratings";
  
    const totalStars = 5;
    const filledStars = Math.round(rating / 20);
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
  