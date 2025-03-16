import { FiStar } from "react-icons/fi"

const ReviewCard = ({ review }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold">{review.user}</h3>
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
  )
}

export default ReviewCard