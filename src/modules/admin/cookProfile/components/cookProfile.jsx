import { Calendar } from "lucide-react";
import React, { useState, useEffect } from "react";
import { 
  CheckCircle, 
  AlertCircle, 
  Mail, 
  Phone, 
  DollarSign, 
  Trash2, 
  ArrowLeft, 
  MapPin, 
  Briefcase, 
  Award, 
  Star, 
  FileText, 
  Eye,
  Video,
  ExternalLink
} from "react-feather";
import { useGetSingleCook } from "../api/get-single-cook";

const CookProfileDetails = ({ cookId, navigate, onStatusChange }) => {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [showDocumentModal, setShowDocumentModal] = useState(null);
  
  // Use the API hook to fetch cook data
  const { 
    mutateAsync: fetchCook, 
    isLoading, 
    error, 
    data 
  } = useGetSingleCook(cookId, {
    mutationConfig: {
      onSuccess: (data) => {
        console.log("Cook data fetched successfully:", data);
      },
      onError: (error) => {
        console.error("Failed to fetch cook data:", error);
      }
    }
  });

  useEffect(() => {
    if (cookId) {
      fetchCook();
    }
  }, [cookId, fetchCook]);

  // Extract cook data from API response
  const cook = data?.data;

  // Show loading state
  if (isLoading) {
    return (
      <div className="p-4 bg-blue-100 rounded flex items-center">
        <span>Loading cook details...</span>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="p-4 bg-red-100 rounded flex items-center">
        <AlertCircle size={18} className="mr-2 text-red-600" />
        <span>Error loading cook data: {error.message}</span>
      </div>
    );
  }

  // Show empty state
  if (!cook) {
    return (
      <div className="p-4 bg-red-100 rounded flex items-center">
        <AlertCircle size={18} className="mr-2 text-red-600" />
        <span>No cook data provided</span>
      </div>
    );
  }

  const handleDeleteCook = () => {
    console.log("Deleting cook:", cook.id);
    setShowConfirmDelete(false);
    // In real app, make API call to delete cook
    navigate("/admin/cookDetails");
  };

  const handleProvideMoney = () => {
    console.log("Providing money to cook:", cook.id);
    // In real app, show payment form or redirect to payment page
  };
  
  const handleVerifyStatus = (newStatus) => {
    console.log(`Changing status to ${newStatus} for cook:`, cook.id);
    onStatusChange?.(cook.id, newStatus);
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const statusColor = {
    "Verified": "green",
    "Pending": "yellow",
    "Unverified": "red"
  };

  return (
    <div className="max-w-4xl mx-auto">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
      >
        <ArrowLeft size={18} className="mr-2" /> Back to Cooks
      </button>
      
      {/* Profile Header with Actions */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 mb-6">
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center">
              <img
                src={cook.image || "https://via.placeholder.com/150"}
                alt={cook.name}
                className="w-20 h-20 rounded-full object-cover mr-4 border-2 border-gray-200"
              />
              <div>
                <h2 className="font-bold text-xl text-gray-800">{cook.name}</h2>
                <div className="flex items-center mt-1">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${statusColor[cook.status] || "gray"}-100 text-${statusColor[cook.status] || "gray"}-800`}
                  >
                    {cook.status === "Verified" ? (
                      <CheckCircle size={14} className="mr-1" />
                    ) : (
                      <AlertCircle size={14} className="mr-1" />
                    )}
                    {cook.status}
                  </span>
                  
                  {cook.rating > 0 && (
                    <div className="flex items-center text-yellow-500 ml-3">
                      <Star size={14} className="mr-1" />
                      <span className="text-sm font-medium">{cook.averageRating}</span>
                      <span className="text-xs text-gray-500 ml-1">({cook.totalReviews} reviews)</span>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center mt-2 text-gray-500 text-sm">
                  <Calendar size={14} className="mr-1" />
                  <span>Joined {formatDate(cook.joinedDate)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons - Moved to top */}
          <div className="mt-6 border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center mb-4">
              <ExternalLink size={18} className="mr-2 text-blue-500" /> Quick Actions
            </h3>
            
            <div className="flex flex-wrap gap-3">
              {cook.status === "Verified" && (
                <button
                  onClick={handleProvideMoney}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <DollarSign size={16} className="mr-2" /> Provide Money
                </button>
              )}
              
              {cook.status === "Pending" && (
                <button
                  onClick={() => handleVerifyStatus("Verified")}
                  className="flex items-center px-4 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  <CheckCircle size={16} className="mr-2" /> Approve Cook
                </button>
              )}
              
              {cook.status !== "Unverified" && (
                <button
                  onClick={() => handleVerifyStatus("Unverified")}
                  className="flex items-center px-4 py-2 bg-yellow-100 text-yellow-600 font-medium rounded-md hover:bg-yellow-200 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                >
                  <AlertCircle size={16} className="mr-2" /> Suspend Cook
                </button>
              )}
              
              <button
                onClick={() => setShowConfirmDelete(true)}
                className="flex items-center px-4 py-2 bg-red-100 text-red-600 font-medium rounded-md hover:bg-red-200 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <Trash2 size={16} className="mr-2" /> Delete Cook
              </button>
            </div>
          </div>

          {/* Basic Info */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <Mail size={16} className="mr-2 text-gray-400" />
                <span>{cook.email}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Phone size={16} className="mr-2 text-gray-400" />
                <span>{cook.phone}</span>
              </div>
              <div className="flex items-start text-sm text-gray-600">
                <MapPin size={16} className="mr-2 mt-0.5 text-gray-400 flex-shrink-0" />
                <span>{cook.address}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <Briefcase size={16} className="mr-2 text-gray-400" />
                <span>Experience: {cook.experience}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Award size={16} className="mr-2 text-gray-400" />
                <span>Specialties: {cook.specialties.join(", ")}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <FileText size={16} className="mr-2 text-gray-400" />
                <span>Certifications: {cook.certifications?.length ? cook.certifications.join(", ") : "None"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Earnings Section */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 mb-6">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center mb-4">
            <DollarSign size={18} className="mr-2 text-blue-500" /> Earnings & Performance
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-xs text-gray-500">Total Earnings</p>
              <p className="text-lg font-semibold text-gray-800">Rs{cook.earnings?.total.toLocaleString() || 0}</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-xs text-gray-500">Monthly Average</p>
              <p className="text-lg font-semibold text-gray-800">Rs{cook.earnings?.monthly.toLocaleString() || 0}</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <p className="text-xs text-gray-500">Products Sold</p>
              <p className="text-lg font-semibold text-gray-800">{cook.productsSold.toLocaleString() || 0}</p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg">
              <p className="text-xs text-gray-500">Customer Rating</p>
              <p className="text-lg font-semibold text-gray-800 flex items-center">
                {cook.averageRating > 0 ? (
                  <>
                    {cook.averageRating}
                    <Star size={16} className="ml-1 text-yellow-500" />
                  </>
                ) : (
                  "N/A"
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Documents Section */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 mb-6">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center mb-4">
            <FileText size={18} className="mr-2 text-blue-500" /> Verification Documents
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {cook.documents?.passportPhoto && (
              <div className="border rounded-lg overflow-hidden">
                <div className="p-2 bg-gray-50 border-b">
                  <p className="text-xs text-gray-500">Passport Size Photo</p>
                </div>
                <div className="relative group">
                  <img 
                    src={cook.documents.passportPhoto || "https://via.placeholder.com/100"} 
                    alt="Passport" 
                    className="w-full h-32 object-cover" 
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button 
                      onClick={() => setShowDocumentModal("passportPhoto")}
                      className="p-2 bg-white rounded-full"
                    >
                      <Eye size={18} className="text-gray-800" />
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {cook.documents?.citizenshipFront && (
              <div className="border rounded-lg overflow-hidden">
                <div className="p-2 bg-gray-50 border-b">
                  <p className="text-xs text-gray-500">Citizenship Front</p>
                </div>
                <div className="relative group">
                  <img 
                    src={cook.documents.citizenshipFront || "https://via.placeholder.com/100"} 
                    alt="Citizenship Front" 
                    className="w-full h-32 object-cover" 
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button 
                      onClick={() => setShowDocumentModal("citizenshipFront")}
                      className="p-2 bg-white rounded-full"
                    >
                      <Eye size={18} className="text-gray-800" />
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {cook.documents?.citizenshipBack && (
              <div className="border rounded-lg overflow-hidden">
                <div className="p-2 bg-gray-50 border-b">
                  <p className="text-xs text-gray-500">Citizenship Back</p>
                </div>
                <div className="relative group">
                  <img 
                    src={cook.documents.citizenshipBack || "https://via.placeholder.com/100"} 
                    alt="Citizenship Back" 
                    className="w-full h-32 object-cover" 
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button 
                      onClick={() => setShowDocumentModal("citizenshipBack")}
                      className="p-2 bg-white rounded-full"
                    >
                      <Eye size={18} className="text-gray-800" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Video Section */}
      {cook.video && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 mb-6">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center mb-4">
              <Video size={18} className="mr-2 text-blue-500" /> Introduction Video
            </h3>
            <div className="aspect-w-16 aspect-h-9">
              <video controls className="w-full rounded-lg">
                <source src={cook.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      )}
      
      {/* Delete Confirmation Modal */}
      {showConfirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this cook? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowConfirmDelete(false)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteCook}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Document Modal */}
      {showDocumentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 max-w-3xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">
                {showDocumentModal === "passportPhoto" && "Passport Size Photo"}
                {showDocumentModal === "citizenshipFront" && "Citizenship Front"}
                {showDocumentModal === "citizenshipBack" && "Citizenship Back"}
              </h3>
              <button
                onClick={() => setShowDocumentModal(null)}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex justify-center">
              <img
                src={cook.documents?.[showDocumentModal] || "https://via.placeholder.com/400"}
                alt={showDocumentModal}
                className="max-h-screen object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CookProfileDetails;