import { useState } from "react";
import { FiStar } from "react-icons/fi";
import { toast } from "react-toastify";
import { useReview } from "../api/storeReviews";

export const ReviewForm = ({ cookId, setShowReviewForm, setCook, onReviewSubmit }) => {
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewErrors, setReviewErrors] = useState({});
  
  const { mutateAsync, isLoading } = useReview();

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    const errors = {};
    if (reviewRating === 0) {
      errors.ratings = "Please select a rating";
    }
    if (!reviewComment.trim()) {
      errors.comment = "Please enter your review";
    } else if (reviewComment.trim().length < 10) {
      errors.comment = "Review must be at least 10 characters";
    }

    if (Object.keys(errors).length > 0) {
      setReviewErrors(errors);
      return;
    }

    setReviewErrors({});

    try {
      const newReview = await mutateAsync({
        cook_id: cookId,
        ratings: reviewRating,
        comment: reviewComment,
      });

      setCook((prevCook) => ({
        ...prevCook,
        reviews: [newReview, ...(prevCook.reviews || [])],
        reviewCount: prevCook.reviewCount + 1,
      }));

      setReviewRating(0);
      setReviewComment("");
      setShowReviewForm(false);
      toast.success("Review submitted successfully!", {
        position: "bottom-right",
        autoClose: 3000,
      });

      if (onReviewSubmit) {
        onReviewSubmit(newReview); 
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit review. Try again later.");
    }
  };

  return (
    <div className="bg-gray-50 rounded-lg shadow-md p-6 mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Write a Review</h3>
        <button onClick={() => setShowReviewForm(false)} className="text-gray-500 hover:text-gray-700">
          ✖
        </button>
      </div>

      <form onSubmit={handleReviewSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => setReviewRating(star)}
                className="text-2xl cursor-pointer"
              >
                <FiStar className={`${star <= reviewRating ? "text-yellow-500 fill-current" : "text-gray-300"}`} />
              </span>
            ))}
            <span className="ml-2 text-sm text-gray-500">
              {reviewRating > 0 ? `${reviewRating} out of 5 stars` : "Select a rating"}
            </span>
          </div>
          {reviewErrors.ratings && <p className="mt-1 text-sm text-red-600">{reviewErrors.ratings}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="reviewComment" className="block text-sm font-medium text-gray-700 mb-2">
            Your Review
          </label>
          <textarea
            id="reviewComment"
            rows={4}
            value={reviewComment}
            onChange={(e) => setReviewComment(e.target.value)}
            placeholder="Share your experience..."
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-green-200 focus:border-transparent"
          ></textarea>
          {reviewErrors.comment && <p className="mt-1 text-sm text-red-600">{reviewErrors.comment}</p>}
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => setShowReviewForm(false)}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 mr-2 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-[#426B1F] text-white rounded-md hover:bg-green-700"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit Review"}
          </button>
        </div>
      </form>
    </div>
  );
};
