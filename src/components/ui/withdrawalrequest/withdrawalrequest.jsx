import { Link } from "react-router-dom";

 export const WithdrawalRequestMessage = ({ request, onApprove, onReject, onArchive }) => {
    const { id, amount, user, date, status, email, image, cookId } = request;
  
    return (
      <div className="bg-white p-4 rounded-lg border border-gray-100 flex items-center justify-between">
        <div className="flex items-center">
          {image && (
            <img
              src={image}
              alt={user}
              className="w-10 h-10 rounded-full object-cover mr-4"
            />
          )}
          <div>
            {cookId ? (
              <Link
                to={`/cook-profile/${cookId}`}
                className="text-blue-600 hover:underline font-medium"
              >
                {user}
              </Link>
            ) : (
              <span className="font-medium">{user}</span>
            )}
            {email && <p className="text-sm text-gray-500">{email}</p>}
            <p className="text-xs text-gray-400">Requested: {date}</p>
          </div>
        </div>
  
        <div className="flex items-center space-x-4">
          <p className="font-medium">Rs.{amount.toFixed(2)}</p>
          {status === "pending" ? (
            <div className="flex space-x-2">
              <button
                onClick={() => onApprove(id)}
                className="px-3 py-1 bg-green-100 text-green-700 rounded-md text-sm hover:bg-green-200"
              >
                Approve
              </button>
              <button
                onClick={() => onReject(id)}
                className="px-3 py-1 bg-red-100 text-red-700 rounded-md text-sm hover:bg-red-200"
              >
                Reject
              </button>
            </div>
          ) : (
            <span
              className={`text-sm px-2 py-1 rounded-md ${
                status === "processing"
                  ? "bg-blue-100 text-blue-700"
                  : status === "approved"
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
          )}
          <button
            onClick={() => onArchive(id)}
            className="text-gray-500 hover:text-gray-700 text-sm"
          >
            Archive
          </button>
        </div>
      </div>
    );
  };