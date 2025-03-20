import React from 'react'
import { FiStar } from "react-icons/fi"

const ReviewsTab = ({ food }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium">Customer Reviews</h3>
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
          Write a Review
        </button>
      </div>

      {food.reviews && food.reviews.length > 0 ? (
        <div className="space-y-6">
          {food.reviews.map((review) => (
            <div key={review.id} className="border-b pb-6 last:border-b-0">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">{review.user}</h4>
                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <FiStar
                        key={i}
                        className={`${i < review.rating ? "text-yellow-500 fill-current" : "text-gray-300"} mr-1`}
                      />
                    ))}
                    <span className="text-gray-500 text-sm ml-2">{review.date}</span>
                  </div>
                </div>
              </div>

              <p className="mt-3 text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No reviews yet. Be the first to review this item!</p>
      )}
    </div>
  )
}

export default ReviewsTab