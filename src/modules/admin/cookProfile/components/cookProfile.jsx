import React from "react";
import { CheckCircle, AlertCircle, Mail, Phone, DollarSign, Trash2 } from "react-feather";

const CookProfileDetails = ({ cook, navigate }) => {
  console.log("CookProfileDetails rendering with:", cook);
  
  // Safety check
  if (!cook) {
    return <div className="p-4 bg-red-100 rounded">No cook data provided</div>;
  }
  
  const handleVerifyCook = (cookId) => {
    console.log("Verifying cook:", cookId);
  };

  const handleDeleteCook = (cookId) => {
    console.log("Deleting cook:", cookId);
    navigate("/admin/cookDetails"); // Redirect back to cooks list
  };

  // Safe accessor function
  const safeGet = (obj, path, fallback = "N/A") => {
    try {
      const result = path.split('.').reduce((o, p) => o?.[p], obj);
      return result !== undefined && result !== null ? result : fallback;
    } catch (e) {
      console.error(`Error accessing ${path}:`, e);
      return fallback;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center">
              {safeGet(cook, 'image') ? (
                <img
                  src={cook.image}
                  alt={safeGet(cook, 'name')}
                  className="w-14 h-14 rounded-full object-cover mr-4"
                  onError={(e) => {
                    console.log("Image failed to load");
                    e.target.src = "https://via.placeholder.com/56"; // Fallback image
                  }}
                />
              ) : (
                <div className="w-14 h-14 rounded-full bg-gray-200 mr-4 flex items-center justify-center">
                  <span className="text-gray-500">No img</span>
                </div>
              )}
              <div>
                <h3 className="font-semibold text-lg text-gray-800">{safeGet(cook, 'name')}</h3>
                <div className="flex items-center mt-1">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      safeGet(cook, 'status') === "Verified"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {safeGet(cook, 'status') === "Verified" ? (
                      <CheckCircle size={14} className="mr-1" />
                    ) : (
                      <AlertCircle size={14} className="mr-1" />
                    )}
                    {safeGet(cook, 'status')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mt-4 space-y-2">
            <div className="flex items-center text-sm text-gray-600">
              <Mail size={16} className="mr-2 text-gray-400" />
              <span>{safeGet(cook, 'email')}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Phone size={16} className="mr-2 text-gray-400" />
              <span>{safeGet(cook, 'phone')}</span>
            </div>
          </div>

          {/* Earnings Section */}
          <div className="mt-5 p-4 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 flex items-center mb-3">
              <DollarSign size={16} className="mr-1 text-gray-500" /> Earnings
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500">Total Earnings</p>
                <p className="text-lg font-semibold text-gray-800">
                  Rs{safeGet(cook, 'earnings.total', 0).toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Monthly Average</p>
                <p className="text-lg font-semibold text-gray-800">
                  Rs{safeGet(cook, 'earnings.monthly', 0).toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex justify-between">
            {safeGet(cook, 'status') !== "Verified" && (
              <button
                onClick={() => handleVerifyCook(safeGet(cook, 'id'))}
                className="flex items-center px-3 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <CheckCircle size={16} className="mr-1" /> Verify
              </button>
            )}
            <button
              onClick={() => handleDeleteCook(safeGet(cook, 'id'))}
              className="flex items-center px-3 py-2 bg-red-100 text-red-600 text-sm font-medium rounded-md hover:bg-red-200 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <Trash2 size={16} className="mr-1" /> Delete
            </button>
          </div>
        </div>
      </div>
      <pre className="mt-4 p-4 bg-gray-100 rounded overflow-auto hidden">
        {JSON.stringify(cook, null, 2)} {/* Hidden debug info */}
      </pre>
    </div>
  );
};

export default CookProfileDetails;