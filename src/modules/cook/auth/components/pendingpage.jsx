export default function PendingPage() {

  
    return (
      <div className="flex flex-col items-center justify-center min-h-fit bg-white text-center p-6">
        <div className="mb-6">
          {/* <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200 mx-auto mb-4">
            <img 
              src={getProfileImage()} 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div> */}
          
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Your Profile is Under Review</h1>
          <p className="text-lg text-gray-600 mb-6">We will mail you when it's done.</p>
        </div>
        
        <button
          onClick={() => window.location.href = '/'}
          className="bg-[#426B1F] text-white px-6 py-2 rounded-lg font-semibold hover:bg-opacity-90 transition"
        >
          Go to Home
        </button>
      </div>
    );
  }