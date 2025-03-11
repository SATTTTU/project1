// import { useParams } from "react-router-dom";
import RatingStars from "./ratingStar";


const CookRow = ({ cook, navigate }) => {
  const { id, name, status, rating, productsSold } = cook;
  return (
    <tr className="border-b hover:bg-gray-100">
      <td className="p-3 text-left align-middle">{name}</td>
      <td className="p-3 text-center align-middle">
        <span
          className={`inline-block px-2 py-1 rounded-full text-xs whitespace-nowrap ${
            status === "Verified" ? "bg-green-100 text-green-800" :
            status === "Pending" ? "bg-yellow-100 text-yellow-800" :
            "bg-red-100 text-red-800"
          }`}
        >
          {status}
        </span>
      </td>
      <td className="p-3 text-center align-middle">
        <RatingStars rating={rating} />
      </td>
      <td className="p-3 text-center align-middle">{productsSold}</td>
      <td className="p-3 text-center align-middle">
        <button
          onClick={() => navigate(`/admin/cookDetails/${id}`)}
          className="text-blue-500 hover:underline"
        >
          Profile
        </button>
      </td>
    </tr>
  );
};

export default CookRow;
