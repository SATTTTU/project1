import { useState } from "react"
import ReviewCard from "./ReviewCard"
import ReviewForm from "./ReviewForm"

export const CookReviews = ({ reviews, cookId, cookName, setCook }) => {
  const [showReviewForm, setShowReviewForm] = useState(false)

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
          cookId={cookId}
          cookName={cookName}
          setCook={setCook}
        />
      )}

      <div className="space-y-6">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  )
}

