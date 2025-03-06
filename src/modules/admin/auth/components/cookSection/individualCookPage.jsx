import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  CheckCircle,
  AlertCircle,
  Mail,
  Phone,
  DollarSign,
  Trash2,
} from "react-feather";
import { Sidebar } from "../homepage/aside/aside";
import { cooksData } from "./cookPage";

export const CookProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cook, setCook] = useState(null);

  useEffect(() => {
    // Find cook from the data using the ID
    const foundCook = cooksData.find((c) => c.id === parseInt(id));
    if (foundCook) {
      setCook(foundCook);
    }
  }, [id]);

  const handleVerifyCook = (cookId) => {
    // Add verification logic here
    console.log("Verifying cook:", cookId);
  };

  const handleDeleteCook = (cookId) => {
    // Add deletion logic here
    console.log("Deleting cook:", cookId);
    navigate("/admin/cook-details"); // Redirect back to cooks list
  };

  if (!cook) {
    return (
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 p-8">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <img
                    src={cook.image}
                    alt={cook.name}
                    className="w-14 h-14 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">
                      {cook.name}
                    </h3>
                    <div className="flex items-center mt-1">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          cook.status === "Verified"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {cook.status === "Verified" ? (
                          <CheckCircle size={14} className="mr-1" />
                        ) : (
                          <AlertCircle size={14} className="mr-1" />
                        )}
                        {cook.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Mail size={16} className="mr-2 text-gray-400" />
                  <span>{cook.email}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Phone size={16} className="mr-2 text-gray-400" />
                  <span>{cook.phone}</span>
                </div>
              </div>

              <div className="mt-5 p-4 bg-gray-50 rounded-lg">
                <h4 className="text-sm font-medium text-gray-700 flex items-center mb-3">
                  <DollarSign size={16} className="mr-1 text-gray-500" />{" "}
                  Earnings
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Total Earnings</p>
                    <p className="text-lg font-semibold text-gray-800">
                      ${cook.earnings?.total?.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Monthly Average</p>
                    <p className="text-lg font-semibold text-gray-800">
                      ${cook.earnings?.monthly?.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-between">
                {cook.status !== "Verified" && (
                  <button
                    onClick={() => handleVerifyCook(cook.id)}
                    className="flex items-center px-3 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    <CheckCircle size={16} className="mr-1" /> Verify
                  </button>
                )}
                <button
                  onClick={() => handleDeleteCook(cook.id)}
                  className="flex items-center px-3 py-2 bg-red-100 text-red-600 text-sm font-medium rounded-md hover:bg-red-200 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <Trash2 size={16} className="mr-1" /> Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
