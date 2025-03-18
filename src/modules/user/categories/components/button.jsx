import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

const BackButton = () => {
  return (
    <div className="mb-6">
      <Link to="/user/home" className="inline-flex items-center text-gray-600 hover:text-green-600 transition-colors">
        <FiArrowLeft className="mr-2" />
        Back to Home
      </Link>
    </div>
  );
};

export default BackButton;