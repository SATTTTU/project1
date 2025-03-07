import { useNavigate } from "react-router-dom";

 export const NotFoundPage = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate("/");
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <img 
                src="https://cdn-icons-png.flaticon.com/512/2748/2748558.png" 
                alt="404 Not Found"
                className="w-64 h-64 mb-6"
            />
            <h1 className="text-4xl font-bold text-gray-800">Oops! Page Not Found</h1>
            <p className="text-gray-600 mt-2">The page you're looking for doesn't exist or has been moved.</p>
            <button 
                onClick={handleGoHome} 
                className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all">
                Go to HomePage
            </button>
        </div>
    );
};
