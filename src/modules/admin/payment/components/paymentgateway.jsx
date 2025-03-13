import React from "react";
import { CreditCard, Shield, Settings, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const PaymentGatewayCard = ({ option }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
      <div className={`h-2 ${option.color}`}></div>
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            <div className={`${option.color} p-2 rounded-md text-white mr-3`}>
              {option.icon}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800">{option.name}</h2>
              <p className="text-sm text-gray-600">{option.description}</p>
            </div>
          </div>
          <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
            option.status === "Active" ? "bg-green-100 text-green-800" : 
            option.status === "Inactive" ? "bg-red-100 text-red-800" : 
            "bg-yellow-100 text-yellow-800"
          }`}>
            {option.status}
          </span>
        </div>
        
        <div className="mt-4 flex items-center text-xs text-gray-500">
          <Shield size={14} className="mr-1" />
          <span>Last updated: {option.lastUpdated}</span>
        </div>
        
        <div className="mt-4 flex justify-between pt-4 border-t">
          <Link className="text-sm text-gray-600 hover:text-gray-800 flex items-center">
            <Settings size={16} className="mr-1" />
            Configure
          </Link>
          <Link className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
            View Details
            <ChevronRight size={16} className="ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentGatewayCard;
