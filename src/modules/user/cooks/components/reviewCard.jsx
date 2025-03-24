import { FiStar, FiTrash } from "react-icons/fi";
import { useDeleteReview } from "../api/deleteReview";

const ReviewCard = ({ review, setCook }) => {
  const { mutate: deleteReview, isLoading } = useDeleteReview({
    onSuccess: (deletedReviewId) => {
      setCook((prevCook) => ({
        ...prevCook,
        reviews: prevCook.reviews.filter((r) => r.review_id !== deletedReviewId), // ✅ Use review_id
        reviewCount: prevCook.reviewCount - 1,
      }));
    },
  });

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      deleteReview(review.review_id);
    }
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
                className={`${i < (review.ratings || 0) ? "text-yellow-500 fill-current" : "text-gray-300"} mr-1`}
              />
            ))}
            <span className="text-gray-500 text-sm ml-2">{review.date}</span>
          </div>
        </div>

        <button
          onClick={handleDelete}
          className="text-red-500 hover:text-red-700"
          disabled={isLoading}
        >
          {isLoading ? "Deleting..." : <FiTrash className="text-xl" />}
        </button>
      </div>

      <p className="mt-3 text-gray-700">{review.comment}</p>
    </div>
  );
};

export default ReviewCard;
