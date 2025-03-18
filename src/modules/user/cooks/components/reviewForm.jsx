import { useState } from "react"
import { FiStar } from "react-icons/fi"
import { toast } from "react-toastify"

const ReviewForm = ({ setShowReviewForm,  setCook }) => {
  const [reviewRating, setReviewRating] = useState(0)
  const [reviewComment, setReviewComment] = useState("")
  const [reviewErrors, setReviewErrors] = useState({})
  const [isSubmittingReview, setIsSubmittingReview] = useState(false)

  const handleReviewSubmit = (e) => {
    e.preventDefault()

    const errors = {}
    if (reviewRating === 0) {
      errors.rating = "Please select a rating"
    }
    if (!reviewComment.trim()) {
      errors.comment = "Please enter your review"
    } else if (reviewComment.trim().length < 10) {
      errors.comment = "Review must be at least 10 characters"
    }

    if (Object.keys(errors).length > 0) {
      setReviewErrors(errors)
      return
    }

    setReviewErrors({})

    setIsSubmittingReview(true)

    // Simulate API call with timeout
    setTimeout(() => {
      // In a real app, you would send this data to your API
      const newReview = {
        id: Date.now(), // Use a proper ID in a real app
        user: "You", // In a real app, get the user's name from auth
        rating: reviewRating,
        comment: reviewComment,
        date: "Just now",
      }

      // Update the cook's reviews (in a real app, this would come from the API response)
      setCook((prevCook) => ({
        ...prevCook,
        reviews: [newReview, ...prevCook.reviews],
        reviewCount: prevCook.reviewCount + 1,
      }))

      setReviewRating(0)
      setReviewComment("")
      setShowReviewForm(false)
      setIsSubmittingReview(false)

      toast.success("Review submitted successfully!", {
        position: "bottom-right",
        autoClose: 3000,
      })
    }, 1500) // Simulate network delay
  }

  return (
    <div className="bg-gray-50 rounded-lg shadow-md p-6 mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Write a Review</h3>
        <button onClick={() => setShowReviewForm(false)} className="text-gray-500 hover:text-gray-700">
        
        </button>
      </div>

      <form onSubmit={handleReviewSubmit}>
        {/* Star Rating */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setReviewRating(star)}
                className="text-2xl focus:outline-none mr-1"
              >
                <FiStar
                  className={`${star <= reviewRating ? "text-yellow-500 fill-current" : "text-gray-300"}`}
                />
              </button>
            ))}
            <span className="ml-2 text-sm text-gray-500">
              {reviewRating > 0 ? `${reviewRating} out of 5 stars` : "Select a rating"}
            </span>
          </div>
          {reviewErrors.rating && <p className="mt-1 text-sm text-red-600">{reviewErrors.rating}</p>}
        </div>

        {/* Review Comment */}
        <div className="mb-4">
          <label htmlFor="reviewComment" className="block text-sm font-medium text-gray-700 mb-2">
            Your Review
          </label>
          <textarea
            id="reviewComment"
            rows={4}
            value={reviewComment}
            onChange={(e) => setReviewComment(e.target.value)}
            placeholder="Share your experience with this cook..."
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
          ></textarea>
          {reviewErrors.comment && <p className="mt-1 text-sm text-red-600">{reviewErrors.comment}</p>}
        </div>

        {/* Submit Button */}
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
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            disabled={isSubmittingReview}
          >
            {isSubmittingReview ? (
              <span className="flex items-center">
             
                Submitting...
              </span>
            ) : (
              "Submit Review"
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ReviewForm