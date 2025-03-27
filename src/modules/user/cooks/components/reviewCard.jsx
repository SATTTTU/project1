import { useState } from "react";
import { FiStar, FiTrash, FiEdit } from "react-icons/fi";
import { useUpdateReview } from "../api/updateReview";
import { useDeleteReview } from "../api/deleteReview";

const ReviewCard = ({ review, setCook }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(review.comment);
  const [editedRating, setEditedRating] = useState(review.ratings);

  const { mutate: deleteReview, isLoading: isDeleting } = useDeleteReview({
    onSuccess: (deletedReviewId) => {
      setCook((prevCook) => ({
        ...prevCook,
        reviews: prevCook.reviews.filter((r) => r.review_id !== deletedReviewId),
        reviewCount: prevCook.reviewCount - 1,
      }));
    },
  });

  // Update Review Mutation
  const { mutate: updateReview, isLoading: isUpdating } = useUpdateReview({
    onMutate: async (updatedData) => {
      // Optimistic UI update before API response
      setCook((prevCook) => ({
        ...prevCook,
        reviews: prevCook.reviews.map((r) =>
          r.review_id === review.review_id
            ? { ...r, comment: updatedData.data.comment, ratings: updatedData.data.ratings }
            : r
        ),
      }));
    },
    onSuccess: (updatedReview) => {
      // Ensure the latest data is set after a successful API call
      setCook((prevCook) => ({
        ...prevCook,
        reviews: prevCook.reviews.map((r) =>
          r.review_id === updatedReview.review_id ? updatedReview : r
        ),
      }));
      setIsEditing(false);
    },
  });

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      deleteReview(review.review_id);
    }
  };

  const handleUpdate = () => {
    updateReview({
      reviewId: review.review_id,
      data: {
        comment: editedComment,
        ratings: editedRating,
      },
    });
    setIsEditing(false); // Hide the edit form immediately
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 relative">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold">{typeof review.user === "string" ? review.user : review.user.name}</h3>
          <div className="flex items-center mt-1">
            {[...Array(5)].map((_, i) => (
              <FiStar
                key={i}
                className={`${i < (editedRating || 0) ? "text-yellow-500 fill-current" : "text-gray-300"} mr-1`}
              />
            ))}
            <span className="text-gray-500 text-sm ml-2">{review.date}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <button onClick={() => setIsEditing(true)} className="text-blue-500 hover:text-blue-700">
            <FiEdit className="text-xl" />
          </button>
          <button onClick={handleDelete} className="text-red-500 hover:text-red-700" disabled={isDeleting}>
            {isDeleting ? "Deleting..." : <FiTrash className="text-xl" />}
          </button>
        </div>
      </div>

      {isEditing ? (
        <div className="mt-3">
          <textarea
            className="w-full p-2 border rounded"
            value={editedComment}
            onChange={(e) => setEditedComment(e.target.value)}
          />
          <input
            type="number"
            min="1"
            max="5"
            className="w-full p-2 border rounded mt-2"
            value={editedRating}
            onChange={(e) => setEditedRating(Number(e.target.value))}
          />
          <div className="mt-2 flex gap-2">
            <button onClick={handleUpdate} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              {isUpdating ? "Updating..." : "Save"}
            </button>
            <button onClick={() => setIsEditing(false)} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <p className="mt-3 text-gray-700">{editedComment}</p>
      )}
    </div>
  );
};

export default ReviewCard;
