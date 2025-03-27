import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import ReviewCard from "./reviewCard";
import { useUserReview } from "../api/getReview";
import { ReviewForm } from "./reviewForm";

export const CookReviews = ({ id, cookName, setCook }) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const queryClient = useQueryClient();
  const { data: reviews } = useUserReview(id); // Fetch reviews
  console.log("REview", reviews)

  const handleDeleteReview = (id) => {
    // ✅ Invalidate the query to refetch the updated reviews
    queryClient.invalidateQueries(["cookProfile", id]);
  };

  const handleReviewSubmit = (newReview) => {
    setShowReviewForm(false);

    // ✅ Optimistically update the UI before fetching new data
    setCook((prevCook) => ({
      ...prevCook,
      reviews: [newReview, ...prevCook.reviews], // Prepend new review
      reviewCount: prevCook.reviewCount + 1,
    }));

    // ✅ Invalidate the query to refresh the review list
    queryClient.invalidateQueries(["cookProfile", id]);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Customer Reviews</h2>
        <button
          onClick={() => setShowReviewForm(true)}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Write a Review
        </button>
      </div>

      {showReviewForm && (
        <ReviewForm
          setShowReviewForm={setShowReviewForm}
          cookId={id}
          cookName={cookName}
          setCook={setCook}
          onReviewSubmit={handleReviewSubmit} // ✅ Pass callback function
        />
      )}

      <div className="space-y-6">
        {reviews?.map((review) => (
          <ReviewCard key={`${review.id}-${Math.random()}`}
          review={review} onDelete={handleDeleteReview} />
        ))}
      </div>
    </div>
  );
};
