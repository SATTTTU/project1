import { useNavigate } from "react-router-dom";

export const NotFoundPage = () => {
  const navigate = useNavigate();
  
  const handleGoHome = () => {
    navigate("/");
  };
  
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <svg 
            className="w-24 h-24 mx-auto mb-6 text-gray-400" 
            fill="currentColor" 
            viewBox="0 0 24 24"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8 0-1.85.63-3.55 1.69-4.9L16.9 18.31C15.55 19.37 13.85 20 12 20zm6.31-3.1L7.1 5.69C8.45 4.63 10.15 4 12 4c4.42 0 8 3.58 8 8 0 1.85-.63 3.55-1.69 4.9z" />
          </svg>
          
          <h1 className="text-3xl font-semibold text-gray-800 mb-2">Page Not Found</h1>
          
          <p className="text-gray-600 mb-6">
            We couldn't find the page you're looking for. The kitchen seems to be missing this recipe.
          </p>
          
          <div className="flex flex-col space-y-3">
            <button
              onClick={handleGoHome}
              className="w-full px-4 py-2 bg-teal-600 text-white font-medium rounded hover:bg-teal-700 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            >
              Return to Dashboard
            </button>
            
            <button
              onClick={() => navigate(-1)}
              className="w-full px-4 py-2 bg-white text-gray-700 font-medium rounded border border-gray-300 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-sm text-gray-500">
        <p>Need assistance? <a href="/support" className="text-teal-600 hover:underline">Contact Support</a></p>
      </div>
    </div>
  );
};