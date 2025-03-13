import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CookProfileDetails from "@/modules/admin/cookProfile/components/cookProfile";
import { cookData } from "@/modules/admin/cook/components/data";
import { Sidebar } from "@/components/ui/admin/aside/aside";
import { Loader2 } from "lucide-react";
export const CookProfileRoute = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cook, setCook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCook = async () => {
      try {
        if (!Array.isArray(cookData)) {
          throw new Error("Cook data is not available");
        }

        // Find cook with a single comparison using loose equality
        const foundCook = cookData.find(c => c.id == id);
        
        if (foundCook) {
          setCook(foundCook);
        } else {
          throw new Error(`Cook not found with ID: ${id}`);
        }
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCook();
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleGoToList = () => {
    navigate("/admin/cooks");
  };

  if (isLoading) {
    return (
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center p-8 bg-white rounded-lg shadow-sm">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-500" />
            <h2 className="text-xl font-semibold mb-2">Loading Cook Profile</h2>
            <p className="text-gray-500">Please wait while we fetch the data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !cook) {
    return (
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center p-8 bg-white rounded-lg shadow-sm max-w-md">
            <div className="bg-red-100 text-red-600 p-4 rounded-lg mb-4">
              <h2 className="text-xl font-semibold mb-2">Cook Not Found</h2>
              <p>{error || `We couldn't find a cook with ID ${id}`}</p>
            </div>
            <div className="flex gap-4 justify-center mt-4">
              <button onClick={handleBack} variant="outline">
                Go Back
              </button>
              <button onClick={handleGoToList}>
                View All Cooks
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-8 overflow-auto">
        <div className="mb-4">
          <button onClick={handleBack} variant="outline" className="mb-4">
            ← Back
          </button>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <CookProfileDetails cook={cook} navigate={navigate} />
        </div>
      </div>
    </div>
  );
};