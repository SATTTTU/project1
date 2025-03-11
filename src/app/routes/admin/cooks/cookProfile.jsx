import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Sidebar } from "@/modules/admin/components/homepage/aside/aside";
import CookProfileDetails from "@/modules/admin/cookProfile/components/cookProfile";
import { cookData } from "@/modules/admin/cook/components/data";

export const CookProfileRoute = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cook, setCook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!Array.isArray(cookData)) {
      console.error("cookData is not an array:", cookData);
      setIsLoading(false);
      return;
    }

    // Find cook with a single comparison using loose equality
    const foundCook = cookData.find(c => c.id == id);
    
    if (foundCook) {
      setCook(foundCook);
    } else {
      console.error(`Cook not found with id: ${id}`);
    }
    
    setIsLoading(false);
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex h-screen bg-gray-100">
        <div className="flex-1 p-8">
          <div className="text-center">
            <p>Loading... (ID: {id})</p>
            <p>If this persists, the cook with ID {id} might not exist.</p>
          </div>
        </div>
      </div>
    );
  }

  if (!cook) {
    return (
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 p-8">
          <div className="text-center">
            <p>Cook with ID {id} not found.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-8">
        <CookProfileDetails cook={cook} navigate={navigate} />
      </div>
    </div>
  );
};